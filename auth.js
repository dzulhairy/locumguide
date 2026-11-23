// Simple login gate for MyClinicalGuide.MY.
// NOTE: this is a client-side gate on a static site. It keeps casual visitors out but is NOT real
// security: the page's files remain downloadable by anyone with the URL. Only a SHA-256 hash of
// "loginid:password" is stored here, never the password itself.
(function(){
  const HASH = "53ef44cbd9acfa61725363205a091e58e179e96c437131a3b341ed94b8b184a7";
  const KEY = "mcg-auth";
  let ok = false;
  try { ok = localStorage.getItem(KEY) === HASH; } catch (e) {}
  if (!ok) document.documentElement.classList.add("locked");

  async function sha256(text){
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,"0")).join("");
  }
  const L = (ms,en) => { try { return localStorage.getItem("lqg-lang")==="en" ? en : ms; } catch(e){ return ms; } };

  window.mcgLogout = function(){
    try { localStorage.removeItem(KEY); } catch(e) {}
    location.reload();
  };

  document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("loginGate");
    if (!box) return;
    box.querySelector("[data-l='title']").textContent = L("Log masuk","Sign in");
    box.querySelector("[data-l='id']").textContent = L("ID log masuk","Login ID");
    box.querySelector("[data-l='pw']").textContent = L("Kata laluan","Password");
    box.querySelector("[data-l='remember']").textContent = L("Ingat saya di peranti ini","Remember me on this device");
    box.querySelector("button[type=submit]").textContent = L("Masuk","Sign in");
    box.querySelector("[data-l='note']").textContent = L("Untuk kegunaan klinikal dalaman sahaja.","For internal clinical use only.");
    const form = box.querySelector("form"), err = box.querySelector(".login-err");
    if (ok) return;
    setTimeout(() => form.elements.uid.focus(), 50);
    form.addEventListener("submit", async e => {
      e.preventDefault(); err.textContent = "";
      const id = form.elements.uid.value.trim().toLowerCase(), pw = form.elements.pw.value;
      let h = "";
      try { h = await sha256(`${id}:${pw}`); } catch (x) { err.textContent = L("Browser tidak menyokong log masuk selamat (perlu HTTPS).","This browser cannot verify the login (HTTPS required)."); return; }
      if (h === HASH) {
        if (form.elements.remember.checked) { try { localStorage.setItem(KEY, HASH); } catch (x) {} }
        document.documentElement.classList.remove("locked");
        form.reset();
      } else {
        err.textContent = L("ID atau kata laluan salah.","Wrong login ID or password.");
        form.elements.pw.value = ""; form.elements.pw.focus();
      }
    });
  });
})();
