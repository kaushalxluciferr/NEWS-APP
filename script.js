const API="29f4c198ee19475f9c8c4f30ef3c1447";
const url="https://newsapi.org/v2/everything?q="


const btn=document.querySelector(".btn");
btn.addEventListener("click",()=>{
    const my=document.querySelector("#news-input").value;
    fetchnews(my);
});


window.addEventListener("load",fetchnews("india"));

async function fetchnews(query){
   const res=await fetch(`${url}${query}&apikey=${API}`);
   const data=await res.json();
   binddata(data.articles);
}

function binddata(articles)
{
    const cardcontainer=document.querySelector(".cards-container");
    const newscard=document.querySelector("#templete-news-card");
    
    cardcontainer.innerHTML="";
articles.forEach(article => {
    if(!article.urlToImage) return;

    const cardclone=newscard.content.cloneNode(true);
filldataincard(cardclone,article);

cardcontainer.appendChild(cardclone);


});
}



function filldataincard(cardclone,article)
{
    const newsImg=cardclone.querySelector("#news-img");
    const newsTitle=cardclone.querySelector(".news-title");
    const newsSource=cardclone.querySelector(".news-source");
    const newsDesc=cardclone.querySelector(".news-desc");



    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
       timeZone:"Asia/Jakarta" 
    })

newsSource.innerHTML=`${article.source.name} . ${date}`;
cardclone.firstElementChild.addEventListener("click",()=>{
window.open(article.url,"_blank");
})

}
document.getElementById("ipl").addEventListener("click",fetchnews("ipl"));
document.getElementById("finance").addEventListener("click",fetchnews("finance"));
document.getElementById("politics").addEventListener("click",fetchnews("politics"));
document.getElementById("technology").addEventListener("click",fetchnews("technology"));
