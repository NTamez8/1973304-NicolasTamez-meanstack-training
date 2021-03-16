const KeyName = "Key";

function AddBlog() {
    
    
    
    var p = new Promise((resolve, reject) => {
        const TheImage = document.getElementById("ImageID").files[0];
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = function () {
            resolve(fr.result);
        }
        fr.readAsDataURL(TheImage);
    });

    p.then(StoreData)
}



function StoreData(BinaryImage) {
    
    var title = document.getElementById("Title").value;
    var desc = document.getElementById("Description").value;   
    var obj = {
        Title:title,
        Desc:desc,
        BinaryImage:BinaryImage
    }
    AddNewBlogPost(obj);
    var stringVersion = JSON.stringify(obj);
    var BlogPostKey = KeyName + localStorage.length;
    localStorage.setItem(BlogPostKey,stringVersion);
    ClearSelection();

}

function LoadBlogs()
{
    
    for(var x = 0; x < localStorage.length; x++)
    {
       
        var CurrentObject = JSON.parse(localStorage.getItem(KeyName + x));
        AddNewBlogPost(CurrentObject);
    }



}

function AddNewBlogPost(DataObject)
{

    var PostArea =  document.getElementById("BlogPostArea");

    var NewRow = document.createElement("div");
    NewRow.className = "row";
    var Column = document.createElement("div");
    Column.className = "col-sm-8 offset-2";
    var Title = document.createElement("h1");
    var description = document.createElement("div");
    var Image = document.createElement("img");

    
    Title.innerHTML = DataObject.Title;
    description.innerHTML = DataObject.Desc;
    Image.src = DataObject.BinaryImage;
    

    Column.appendChild(Title);
    Column.appendChild(Image);
    Column.appendChild(document.createElement("hr"));
    Column.appendChild(description);
    Column.appendChild(document.createElement("br"));
    

    NewRow.appendChild(Column);

    PostArea.appendChild(NewRow);

   

}

function ClearSelection()
{
    document.getElementById("Title").value = "";
    document.getElementById("Description").value = "";   
    document.getElementById("ImageID").value = "";
}

function toggle()
{
    var tButton = document.getElementById("toggleBtn");
    var tButtonText = tButton.innerHTML.trim();
    
    tButton.innerHTML = tButtonText == "Show Add Blog Post"? "Hide Add Blog Post":"Show Add Blog Post";


}