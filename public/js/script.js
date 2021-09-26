const category_btn = document.querySelectorAll('.news_cat')
const country_btn = document.querySelectorAll('.country_cat')
const row = document.getElementById('rows')
var count=0
const country_name = document.getElementById("country")
const category_type = document.getElementById("category")
const get_news_btn = document.getElementById("get_news")
// const content1= document.getElementById('content1')
// const content2= document.getElementById('content2')
// const content3= document.getElementById('content3')
// const content4= document.getElementById('content4')
// const content5= document.getElementById('content5')
// const title1= document.getElementById('title1')
// const title2= document.getElementById('title2')
// const title3= document.getElementById('title3')
// const title4 = document.getElementById('title4')
// const title5 = document.getElementById('title5')
// const author1=document.getElementById('author1')
// const author2=document.getElementById('author2')
// const author3=document.getElementById('author3')
// const author4=document.getElementById('author4')
// const author5=document.getElementById('author5')
// const page1=document.getElementById('page1')
// const page2=document.getElementById('page2')
// const page3=document.getElementById('page3')
// const page4=document.getElementById('page4')
// const page5=document.getElementById('page5')
// const anchor1= document.getElementById('anchor1')
// const anchor2= document.getElementById('anchor2')
// const anchor3= document.getElementById('anchor3')
// const anchor4= document.getElementById('anchor4')
// const anchor5= document.getElementById('anchor5')
// const loader = document.getElementById("loader")
// const carousel_content = document.getElementById('carousel_content')
// const prev_btn=document.getElementById('prev_btn')
// const next_btn=document.getElementById('next_btn')
// const main_box = document.getElementById('main_box')



// main_box.style.display='none'
// carousel_content.style.display ='none'
// prev_btn.style.display='none'
//     next_btn.style.display='none'
// loader.style.display='none'
var category =''
var country = 'in'

category_btn[0].addEventListener('click',function btn0(){
    category = ''
    category_type.innerText = 'Top Headlines'
})

category_btn[1].addEventListener('click',function btn1(){
    category = 'business'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})
category_btn[2].addEventListener('click',function btn2(){
    category = 'entertainment'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})
category_btn[3].addEventListener('click',function btn3(){
    category = 'general'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})
category_btn[4].addEventListener('click',function btn4(){
    category = 'health'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})
category_btn[5].addEventListener('click',function btn5(){
    category = 'science'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})
category_btn[6].addEventListener('click',function btn6(){
    category = 'sports'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})
category_btn[7].addEventListener('click',function btn7(){
    category = 'technology'
    category_type.innerText = category.charAt(0).toUpperCase() + category.slice(1);
})

country_btn[0].addEventListener('click',function btn8(){
    country='in'
    country_name.innerText = 'India'
})
country_btn[1].addEventListener('click',function btn8(){
    country='us'
    country_name.innerText = 'USA'
})
country_btn[2].addEventListener('click',function btn10(){
    country='gb'
    country_name.innerText = 'Great Britain'

})
country_btn[3].addEventListener('click',function btn11(){
    country='au'
    country_name.innerText = 'Australia'

})
country_btn[4].addEventListener('click',function btn12(){
    country='ca'
    country_name.innerText = 'Canada'

})


function delete_div(){
    var iconBox = document.getElementsByClassName('align-items-stretch')
        if (iconBox){
            while(iconBox.length > 0){
                iconBox[0].remove()
            }
        }
}




get_news_btn.addEventListener('click',async(e)=>{
    e.preventDefault()
    count+=1
    if (count>1)
    {
        delete_div();
    }
    const res = await fetch("/get_news",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            country,category
        }),
    });
    const data = await res.json()
    for(var i=0;i<data.articles.length;i++)
    {
        var align_items_stretch = document.createElement('div')
        align_items_stretch.className='align-items-stretch'

        var icon_box = document.createElement('div')
        icon_box.className='icon-box'
                
        var icon = document.createElement('div')
        icon.className='icon'
                
        var profileImage = document.createElement('img')
        profileImage.className='bx bxl-dribbble profileImage'

        var a = document.createElement('a')
        a.className='newsUrl'

        var description = document.createElement('p')
        description.className = 'description'

        var author = document.createElement('p')
        author.className='author'

        var source = document.createElement('p')
        source.className='source'

        var publishedAt = document.createElement('p')
        publishedAt.className='publishedAt'

        //append
        icon.appendChild(profileImage)
        icon_box.appendChild(icon)
        icon_box.appendChild(a)
        icon_box.appendChild(description)
        icon_box.appendChild(author)
        icon_box.appendChild(source)
        icon_box.appendChild(publishedAt)
        align_items_stretch.appendChild(icon_box)
        row.appendChild(align_items_stretch)


        //Putting Contents
        if (data.articles[i].urlToImage===null)
        {
            profileImage.src='images/no_image.jpg'
        }
        else{

            profileImage.src=data.articles[i].urlToImage;
        }
        a.innerText=data.articles[i].title;
        a.href=data.articles[i].url
        a.target='_blank'
        description.innerHTML = data.articles[i].description
        if (data.articles[i].author===null)
        {
            author.innerText=data.articles[i].author
        }
        else{
            author.innerText='Author:  '+data.articles[i].author

        }
        source.innerText='Source:  '+data.articles[i].source.name
        publishedAt.innerText='Published At '+data.articles[i].publishedAt
    }
})