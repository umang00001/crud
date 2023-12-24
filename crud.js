// ========================================         global variable   =================================================


let userdata = []
let add_emloyee_btn = document.getElementById('add_emloyee');
let close_icon = document.querySelector('.close_icon');
let register_btn = document.getElementById('register_btn');
let update_btn = document.getElementById('update_btn');
let form = document.getElementById('form');


let id = document.getElementById('id');
let Name = document.getElementById('Name');
let l_name = document.getElementById('l_name');
let Email = document.getElementById('Email');
let Office_Code = document.getElementById('Office_Code');
let Job_TItle = document.getElementById('Job_TItle')






// ========================================           form visibility    =================================================
let form_div = document.getElementsByClassName('form_div')[0];


add_emloyee_btn.onclick = function () {

    form_div.classList.add('active');
    register_btn.disabled = false;
    update_btn.disabled = true;
    register_btn.style.background = "rgb(69, 69, 180)"
    update_btn.style.background = "gray"

}
close_icon.onclick = function () {
    form_div.classList.remove('active')

    let all_input = form.querySelectorAll('input');
    let i;
    for (i = 0; i < all_input.length; i++) {
        all_input[i].value = ""
    }

}
// ========================================          register data     =================================================

register_btn.onclick = function (e) {

    e.preventDefault();
    regisrationdata();
    form.reset();
    close_icon.click();
    getdatefromlocat()


}


if (localStorage.getItem("userdata") != null) {
    userdata = JSON.parse(localStorage.getItem("userdata"));

}


function regisrationdata() {
    userdata.push({
        id: id.value,
        name: Name.value,
        l_name: l_name.value,
        email: Email.value,
        Office_Code: Office_Code.value,
        Job_TItle: Job_TItle.value,



    })


    localStorage.setItem("userdata", JSON.stringify(userdata));
    swal({
        title: "Good job!",
        text: "your data successfuli register!",
        icon: "success",
    });

}

// ========================================     put date from local storage    =================================================
let table = document.getElementById('table')

function getdatefromlocat() {
    table.innerHTML = ""

    userdata.forEach((data, index) => {

        table.innerHTML += `<tr index="${index}">
    <td>${index + 1}</td>
    <td><img src="./img/profile.png"width=40px</td>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.l_name}</td>
    <td>${data.email}</td>
    <td>${data.Office_Code}</td>

    <td>${data.Job_TItle}</td>
    <td>
    <button style="background-color: rgb(69, 69, 180);" class="eye_btn"><i class="fa-solid fa-eye"></i></button>

    <button style="background-color: tomato;" class="delet_item"><i class="fa-regular fa-trash-can"></i></button>

    </td>
    </tr>`


       




    })

    // ========================================    delet item    =================================================
    var delet_item = document.getElementsByClassName('delet_item');

    let i;
    for (i = 0; i < delet_item.length; i++) {
        delet_item[i].onclick = function () {


            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        let tr = this.parentElement.parentElement


                        let trindex = tr.getAttribute('index')

                        userdata.splice(trindex, 1)

                        let str = JSON.stringify(userdata);


                        localStorage.setItem("userdata", str)
                        tr.remove()
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });


        }
    }

    // ========================================    update data   =================================================
    let eye_btn = document.getElementsByClassName('eye_btn');

    for (i = 0; i < eye_btn.length; i++) {
        eye_btn[i].onclick = function () {


            add_emloyee_btn.click();
            register_btn.disabled = true;
            register_btn.style.background = "gray";
            update_btn.disabled = false;
            update_btn.style.background = "tomato"




            let tr = this.parentElement.parentElement
            let index = tr.getAttribute('index')


            for (i = 0; i < userdata.length; i++) {
                id.value = userdata[index].id;


                Name.value = userdata[index].name;
                l_name.value = userdata[index].l_name;
                Email.value = userdata[index].email;
                Office_Code.value = userdata[index].Office_Code;
                Job_TItle.value = userdata[index].Job_TItle;
            }
            update_btn.onclick = function (e) {
                // e.preventDefault();
                userdata[index] = {
                    id: id.value,
                    name: Name.value,
                    l_name: l_name.value,
                    email: Email.value,
                    Office_Code: Office_Code.value,
                    Job_TItle: Job_TItle.value,
                }
                localStorage.setItem("userdata", JSON.stringify(userdata))
                close_icon.click();
            }





        }
    }

}
getdatefromlocat()


// ========================================    erase all data    =================================================


let clear_btn = document.getElementById('clear_btn');


clear_btn.onclick = function () {


    swal({
        title: "Are you sure?",
        text: "once  you click ok your data will deleted forever",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userdata");
                window.location = location.href


                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });




}





// ========================================    search  data  =================================================






let search_input = document.getElementById('search_data');

// let filter = search_input.value;

// search_input.oninput = function(){
//     let tr = table.getElementsByTagName('tr');
//     let i;
//     for(i =0;i<tr.length;i++){
//         let td = tr[i].getElementsByTagName('td')[3].innerHTML;
//         let td_lower = td.toLowerCase()
//          console.log(td)
//         if(td_lower.indexOf(filter)>-1){
//             tr[i].style.display=""
//         }else{
//             tr[i].style.display = "none"
//         }
//     }
// }

let filter = search_input.value;

search_input.oninput = function(){

    let tr =table.getElementsByTagName('tr');

    let i;
    for(i=0;i<tr.length;i++){

        let td = tr[i].getElementsByTagName('td')[2].innerHTML;

        console.log(td)
        if(td.indexOf(filter) > -1){

            tr[i].style.display = "";
        }
        else{
            tr[i].style.display ="none";
        }

    }



}










