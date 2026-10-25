// [open, close] in decimal hours, Sunday first. From Google: Mon–Fri 7:30–4:30, Sat & Sun 8–3.
// (Their old website lists Saturday as 7:30–3. Confirm with the shop.)
const HOURS=[[8,15],[7.5,16.5],[7.5,16.5],[7.5,16.5],[7.5,16.5],[7.5,16.5],[8,15]];
const DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const fmt=h=>{const hh=Math.floor(h),mm=Math.round((h-hh)*60);return (hh%12||12)+(mm?":"+String(mm).padStart(2,"0"):"")+" "+(hh>=12?"PM":"AM")};
const now=new Date(new Date().toLocaleString("en-US",{timeZone:"America/Los_Angeles"}));
const d=now.getDay(),h=now.getHours()+now.getMinutes()/60;
const t=HOURS[d],open=h>=t[0]&&h<t[1];
let nextMsg;
if(open)nextMsg=`Open now · until ${fmt(t[1])}`;
else{const today=h<t[0],n=today?d:(d+1)%7;nextMsg=`Closed · opens ${today?"today":DAYS[n]} ${fmt(HOURS[n][0])}`}

document.querySelectorAll(".js-status").forEach(el=>{el.classList.add(open?"open":"closed");el.lastElementChild.textContent=nextMsg});
const table=document.getElementById("hours");
if(table)table.innerHTML=[1,2,3,4,5,6,0].map(i=>`<tr class="${i===d?"today":""}"><td>${DAYS[i]}</td><td>${fmt(HOURS[i][0])} – ${fmt(HOURS[i][1])}</td></tr>`).join("");
document.querySelectorAll(".yr").forEach(e=>e.textContent=now.getFullYear());
