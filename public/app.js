$(function()
{

  var dataStr = "{  \"sensor\": \"https://example.edu/sensor/TestSensor\",  \"sendTime\": \"2015-09-15T11:05:01.000Z\",  \"data\": [    {      \"@context\": \"http://purl.imsglobal.org/ctx/caliper/v1/Context\",      \"@type\": \"http://purl.imsglobal.org/caliper/v1/NavigationEvent\",      \"actor\": {        \"@context\": \"http://purl.imsglobal.org/ctx/caliper/v1/Context\",        \"@id\": \"https://example.edu/user/TestUser\",        \"@type\": \"http://purl.imsglobal.org/caliper/v1/lis/Person\",        \"name\": null,        \"description\": null,        \"extensions\": {},        \"dateCreated\": \"2015-08-01T06:00:00.000Z\",        \"dateModified\": \"2015-09-02T11:30:00.000Z\"      },      \"action\": \"http://purl.imsglobal.org/vocab/caliper/v1/action#NavigatedTo\",      \"object\": {        \"@context\": \"http://purl.imsglobal.org/ctx/caliper/v1/Context\",        \"@id\": \"https://example.com/viewer/book/34843#epubcfi(/4/3)\",        \"@type\": \"http://www.idpf.org/epub/vocab/structure/#volume\",        \"name\": \"The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)\",        \"description\": null,        \"objectType\": [],        \"alignedLearningObjective\": [],        \"keywords\": [],        \"isPartOf\": null,        \"extensions\": {},        \"dateCreated\": \"2015-08-01T06:00:00.000Z\",        \"dateModified\": \"2015-09-02T11:30:00.000Z\",        \"datePublished\": null,        \"version\": \"2nd ed.\"      },      \"eventTime\": \"2015-09-15T10:15:00.000Z\"    }  ]}";
   var obj = JSON.parse(dataStr);
  var pretty = JSON.stringify(obj, undefined, 4);
  $("#sendDataTextId").text(pretty);
  $(function() {

      $("#sendBtnId").click( function(){
        $("#errorLblId").text("");
        var data1= $("#sendDataTextId").val();
          if(data1==""){
            alert("Please insert some data!");
          }else{

              /*$.post('https://functions1daafd45.azurewebsites.net/api/deepTest',JSON.parse(data),"application/json").success(function(response) {
              
              $("#errorLblId").text(JSON.stringify(response.val));
              }).error(function(error) {
                //console.log("error"+JSON.stringify(error));
                 $("#errorLblId").text(JSON.stringify(error));
              });*/
              $.ajax({
                    url: 'https://functions1daafd45.azurewebsites.net/api/deepTest',
                    dataType: 'json',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(JSON.parse(data1)),
                    processData: false,
                    success: function( data, textStatus, jQxhr ){
                       $("#errorLblId").text( JSON.stringify(jQxhr) );
                    },
                    error: function( jqXhr, textStatus, errorThrown ){
                         $("#errorLblId").text(JSON.stringify(jqXhr));
                    }
              });

        }

      });
  });

  $(function() {

      $("#getBtnId").click( function(){
        //https://functions1daafd45.azurewebsites.net/api/fetchDataFromSql2?code=ts760dcv9rp3c6czspdtrsh3jvlds9i
        $.get('https://sjapimanagement.azure-api.net/caliper/get/caliper/get').success(function(response) {
           
            //alert("response "+ response);
          if(response){
              /*if(response.status==200){
                 alert("response "+ response);

              }*/
               var data = response;
              //$("#showDataLblId").text(JSON.stringify(response));
              if(data instanceof Array){
                for(var i=0;i<data.length;i++){
                  $el =$('<li  style="color:black;" >'+JSON.stringify(data[i])+'</li>');
                        $("#dataListId").append($el);
                }
              }

          }

         }).error(function() {
             console.log("error");
         });
      });
  });


});
