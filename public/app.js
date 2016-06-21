$(function()
{

  $(function() {

      $("#sendBtnId").click( function(){

        var data= $("#sendDataTextId").val();
          if(data==""){
            alert("Please insert some data!");
          }else{

              $.post('https://functions1daafd45.azurewebsites.net/api/deepTest?code=hn4o9o6flk64p1eemzfz7vzgno9n1h9p',data).success(function(response) {

              if(response){
                if(response.status==200){
                  alert("response"+ response.body);
                }else{
                  alert("response"+ response.body);
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

        $.post('https://functions1daafd45.azurewebsites.net/api/fetchDataFromSql2?code=ts760dcv9rp3c6czspdtrsh3jvlds9i').success(function(response) {
           alert("response "+ response.body);
          if(response){
              if(response.status==200){
                 alert("response "+ response.body);

              }
              $("#showDataLblId").text(response.body);
          }

         }).error(function() {
             console.log("error");
         });
      });
  });


});
