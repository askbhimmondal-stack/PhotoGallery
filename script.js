const menu=document.querySelector('.menu-btn');const nav=document.querySelector('nav');if(menu&&nav)menu.addEventListener('click',()=>nav.classList.toggle('open'));
const input=document.getElementById('photoInput'),grid=document.getElementById('galleryGrid'),clear=document.getElementById('clearPhotos');
function renderAdded(){if(!grid)return;let data=JSON.parse(localStorage.getItem('myGalleryPhotos')||'[]');data.forEach((src,i)=>{const a=document.createElement('a');a.className='tile';a.href=src;a.target='_blank';const im=document.createElement('img');im.src=src;im.alt='Added photo '+(i+1);a.appendChild(im);grid.appendChild(a)})}
if(grid)renderAdded();
if(input)input.addEventListener('change',()=>{const files=[...input.files];let old=JSON.parse(localStorage.getItem('myGalleryPhotos')||'[]');Promise.all(files.map(file=>new Promise(resolve=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.readAsDataURL(file)}))).then(items=>{old.push(...items);localStorage.setItem('myGalleryPhotos',JSON.stringify(old));location.reload()})});
if(clear)clear.addEventListener('click',()=>{if(confirm('Remove all added photos?')){localStorage.removeItem('myGalleryPhotos');location.reload()}});
