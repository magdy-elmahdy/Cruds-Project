var prductName =document.getElementById("productName");
var prductPrice =document.getElementById("productPrice");
var prductCategory =document.getElementById("productCate");
var prductDesc =document.getElementById("productDescription");
var addButton =document.getElementById("addProducButton");
var saveUpdateButtton =document.getElementById("saveUpdates")

var proIndex;
var productList;


if(localStorage.getItem("products")==null){
    productList =[]
}else{
    productList = JSON.parse(localStorage.getItem("products"));
    displayProducts(productList)
}


        /////////  Add Product  ////
function AddProduct(){
    var Model ={
        name:prductName.value,
        price:prductPrice.value,
        category:prductCategory.value,
        description:prductDesc.value
    }
    productList.push(Model);
    localStorage.setItem("products", JSON.stringify(productList));
    displayProducts(productList);
    clearInputs()
}
addButton.addEventListener("click",AddProduct);

        /////////  Display Product  ////
function displayProducts(anyArray){
    let cartona="";
    for(let i=0; i<anyArray.length; i++ ){
        cartona+=`<tr>
                    <td>${i+1}</td>
                    <td>${anyArray[i].name}</td>
                    <td>${anyArray[i].price}</td>
                    <td>${anyArray[i].category}</td>
                    <td>${anyArray[i].description}</td>
                    <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`
    }
    document.getElementById("tableContent").innerHTML= cartona;
}
        /////////  Delete Product  ////
function deleteProduct(index){
    productList.splice(index,1)
    localStorage.setItem("products", JSON.stringify(productList));
    displayProducts(productList)
}
        /////////  Search Product  ////
function SearchProduct(){
    let wantedProducts=[]
    let term =document.getElementById("search").value;
    // console.log(term);
    for(let i=0; i<productList.length;i++){
        if(productList[i].name.toLowerCase().includes(term)){
            wantedProducts.push(productList[i]);
            console.log(wantedProducts);
        }
    }
    displayProducts(wantedProducts)
}

        /////////  Update Product  ////
function updateProduct(index){
    prductName.value = productList[index].name;
    prductPrice.value = productList[index].price;
    prductCategory.value = productList[index].category;
    prductDesc.value = productList[index].description;
    proIndex=index;
    // addButton.style.display="none"
    addButton.classList.add("d-none")
    saveUpdateButtton.style.display="inline-block"
}
          /////////  Save Updates  ////
function saveUpdate(){
    productList[proIndex].name=prductName.value;
    productList[proIndex].price=prductPrice.value;
    productList[proIndex].category=prductCategory.value;
    productList[proIndex].description=prductDesc.value;

    localStorage.setItem("products" , JSON.stringify(productList));
    displayProducts(productList);
    addButton.classList.add("d-inline-block");
    saveUpdateButtton.style.display="none";
}
        /////////  Clear Form  ////
function clearInputs(){
    document.getElementById("productName").value="";
    document.getElementById("productPrice").value="";
    document.getElementById("productCate").value="";
    document.getElementById("productDescription").value="";
     
}