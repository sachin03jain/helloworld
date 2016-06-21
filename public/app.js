$(function()
{

  $(function() {

      $("#sendBtnId").click( function(){

        var data= $("#sendDataTextId").val();
          if(data==""){
            alert("Please insert some data!");
          }else{

              $.post('https://functions1daafd45.azurewebsites.net/api/deepTest?code=hn4o9o6flk64p1eemzfz7vzgno9n1h9p',JSON.stringify(data)).success(function(response) {

                 alert("response "+ response);
              if(response){
                if(response.status==200){
                  alert("response"+ response);
                }else{
                  alert("response"+ response);
                }
              }

              }).error(function() {
                console.log("error");
              });

        }

      });
  });

  $(function() {

      $("#getBtnId").click( function(){

        $.get('https://functions1daafd45.azurewebsites.net/api/fetchDataFromSql2?code=ts760dcv9rp3c6czspdtrsh3jvlds9i').success(function(response) {
           
            //alert("response "+ response);
          if(response){
              /*if(response.status==200){
                 alert("response "+ response);

              }*/
              $("#showDataLblId").text(JSON.stringify(response));
          }

         }).error(function() {
             console.log("error");
         });
      });
  });


});
