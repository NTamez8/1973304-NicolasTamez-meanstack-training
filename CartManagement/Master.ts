class ShoppingAPI{
    private items:CartItem[]
    constructor()
    {
        this.items = [
            new CartItem(1,"Phone",150),
            new CartItem(2,"Laptop",250),
            new CartItem(3,"Dvd Player",400),
            new CartItem(4,"Shirt",20),
            new CartItem(5,"Shoes",80),
            new CartItem(6,"Pants",30)
        ]
    }


    GetItems():CartItem[]{
        return this.items;
    
    }

    getItemByID(id:number):CartItem{
        let index = id - 1;
        return this.items[index];
    }


}

const Key = "Key";

class CartItem {
   
    Name: string;
    Price: number;
    constructor(private ID:number,name: string, price: number) {
        this.ID = ID;
        this.Name = name;
        this.Price = price;
    }

    getId()
    {
        return this.ID;
    }
}
class CartItemWrapper{
    item: CartItem;
    quantity:number;
    
    constructor( OgItem:CartItem,quant:number) {
        this.item = OgItem;
        this.quantity = quant;
        
    }

}
class ShoppingCart {
    
    private Cart:Map<number,CartItemWrapper>;

    constructor() {
        this.Cart = new Map<number,CartItemWrapper>();
    }

    buildCartFromJSON(NewCart:string)
    {
        this.Cart = new Map<number,CartItemWrapper>(JSON.parse(NewCart));
    }

    addItemToList(item: CartItem) {
       let id = item.getId();
       if(!this.Cart.has(id))
       {
           let NewItemWrapper = new CartItemWrapper(item,1);
           this.Cart.set(id,NewItemWrapper);
       }
       else
       {
           const OldItem = this.Cart.get(id);
           OldItem.quantity ++;
           
       }

    }

    getJSONMap()
    {
        return [...this.Cart];
    }
   

    getItemFromList(id:number): CartItem
    {
        return this.Cart.get(id).item;
    }

    getList():Map<number,CartItemWrapper>
    {
        return this.Cart;
    }

    getSize() {
        let totalSize:number = 0;
        this.Cart.forEach((x)=>{
            console.log(x.quantity);
            totalSize += x.quantity;
        })
        return totalSize;
    }

    getTotalPrice():number
    {
        let total: number = 0;
        this.Cart.forEach((x)=>{
            total += x.quantity * x.item.Price;

        })


        return total;
    }

   
}

function BuildStock()
{
    let myApi:ShoppingAPI = new ShoppingAPI();
   let Stock:CartItem[] = myApi.GetItems();

  

    Stock.forEach(AddToGrid);


    UpdateCartSize();
}

function AddToGrid(item:CartItem)
{
    let CurrencyFormatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'},);
    let parent = document.getElementById("ItemGrid");

    let columnDiv = document.createElement("div");// column
    columnDiv.className="col";

    let outDiv = document.createElement("div");// container
    outDiv.className="container ItemContainer";

    let Row1 = document.createElement("div");
    Row1.className="row";
    let Row2 = document.createElement("div");
    Row2.className="row";
    let Row3 = document.createElement("div");
    Row3.className = "row";

    

    let Row1Col1 = document.createElement("div");
    Row1Col1.className="col";

    let Row1Col1Item = document.createElement("p");
    Row1Col1Item.innerHTML = `Name: ${item.Name}`;
    Row1Col1.appendChild(Row1Col1Item);
    Row1.appendChild(Row1Col1);

    
    let Row2Col1 = document.createElement("div");
    Row2Col1.className="col";
    let Row2Col1Item = document.createElement("p");
    Row2Col1Item.innerHTML = `Price: ${CurrencyFormatter.format(item.Price)}`;
    Row2Col1.appendChild(Row2Col1Item);
    Row2.appendChild(Row2Col1);

    
    let Row3Col1 = document.createElement("div");
    Row3Col1.className = "col";
    let Row3Col1btn= document.createElement("input");
    Row3Col1btn.type="button";
    Row3Col1btn.value = "Add";
    Row3Col1btn.id = item.getId().toString();
    Row3Col1btn.addEventListener("click",BtnClicked);
    Row3Col1.appendChild(Row3Col1btn);
    Row3.appendChild(Row3Col1);


    outDiv.appendChild(Row1);
    outDiv.appendChild(Row2);
    outDiv.appendChild(Row3);

    columnDiv.appendChild(outDiv);

    parent.appendChild(columnDiv);


}


function BtnClicked()
{
    let myCart:ShoppingCart = new ShoppingCart();
    
    if(sessionStorage.getItem(Key) != null)
    {
        myCart.buildCartFromJSON(sessionStorage.getItem(Key)) ;
       
    }
   
    let api:ShoppingAPI = new ShoppingAPI();
   let NewItem = api.getItemByID(parseInt(this.id));
   
   myCart.addItemToList(NewItem);
  
    let StringVersionOfCart = JSON.stringify(myCart.getJSONMap());
    
    sessionStorage.setItem(Key,StringVersionOfCart);
    UpdateCartSize();
}


function UpdateCartSize()
{
    let myCart:ShoppingCart = new ShoppingCart();
    
    if(sessionStorage.getItem(Key) != null)
    {
        myCart.buildCartFromJSON(sessionStorage.getItem(Key)) ;
       
    }

    let total = myCart.getSize();

    let temp = document.getElementById("numItems");
    temp.innerHTML = `Cart Size ${total}`;


}

function buildCheckoutTable()
{
    let myCart = new ShoppingCart();

    if(sessionStorage.getItem(Key) != null)
    {
        myCart.buildCartFromJSON(sessionStorage.getItem(Key));

        let CartItems = myCart.getList();
        CartItems.forEach(BuildRows);
        BuildFooter(myCart.getTotalPrice());



    }
    else
    {

    }



}

function BuildRows(item:CartItemWrapper)
{
    let CurrencyFormatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'},);
    let body = document.getElementById("TableBody");

    let row = document.createElement("tr");
    let name = document.createElement("td");
    name.innerHTML = item.item.Name;
    let quantity = document.createElement("td");
    quantity.innerHTML = item.quantity.toString();
    let PricePerItem = document.createElement("td");
    PricePerItem.innerHTML = CurrencyFormatter.format(item.item.Price);
    let TotalPrice = document.createElement("td");
    TotalPrice.innerHTML = CurrencyFormatter.format(item.quantity * item.item.Price);
    
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(PricePerItem);
    row.appendChild(TotalPrice);
    

    body.appendChild(row);

}
function BuildFooter(totalPrice:number)
{
    let CurrencyFormatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'},);
    let body = document.getElementById("TableBody");

    let row = document.createElement("tr");
    let PriceLabel = document.createElement("td");
    PriceLabel.innerHTML = "Total Price:"
    PriceLabel.colSpan = 3;
    let total = document.createElement("td");
    total.innerHTML = CurrencyFormatter.format(totalPrice);

    row.appendChild(PriceLabel);
    row.appendChild(total);
    

    body.appendChild(row);
}
function Test()
{
    let mycart:ShoppingCart = new ShoppingCart();
    mycart.addItemToList(new CartItem(11,"charger",110));
    mycart.addItemToList(new CartItem(11,"charger",110));
    mycart.addItemToList(new CartItem(10,"laptop",100));
    console.log(mycart.getSize());
    let serializeVersion = JSON.stringify(mycart.getJSONMap());
   sessionStorage.setItem("temp",JSON.stringify(mycart.getJSONMap()));
   let newCart = new ShoppingCart();
   newCart.buildCartFromJSON(serializeVersion);
   console.log(newCart.getSize());
}

//Test();