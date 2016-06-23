$(function()
{
  //Azure Service URL
  var azureSqlOutputURL = "https://sjapimanagement.azure-api.net/caliper/get";
  var azureURL = "https://sjapimanagement.azure-api.net/caliper/getdocdb";
  var azureInputURL = "https://sjapimanagement.azure-api.net/caliper/event";

  var azureHeaderProp = "Ocp-Apim-Subscription-Key";
  var azureHeadeKey = "242c0bbeeee44f72adb01e955427b703";
  
  //AWS Service URLs
  var aswURL = "https://lgrsowussi.execute-api.us-east-1.amazonaws.com/prod/CaliperOutput";
  var aswInputURL = "https://lgrsowussi.execute-api.us-east-1.amazonaws.com/prod/CaliperInput";
  var awsHeaderProp = "x-api-key";
  var awsHeaderKey = "U8TLdLTaGi4STzc0RLBWS4fBQMhjfYMD9Uk3zsHV";
  
  var dataStr = "{  \"sensor\": \"https://example.edu/sensor/TestSensor\",  \"sendTime\": \"2015-09-15T11:05:01.000Z\",  \"data\": [    {      \"@context\": \"http://purl.imsglobal.org/ctx/caliper/v1/Context\",      \"@type\": \"http://purl.imsglobal.org/caliper/v1/NavigationEvent\",      \"actor\": {        \"@context\": \"http://purl.imsglobal.org/ctx/caliper/v1/Context\",        \"@id\": \"https://example.edu/user/TestUser\",        \"@type\": \"http://purl.imsglobal.org/caliper/v1/lis/Person\",        \"name\": null,        \"description\": null,        \"extensions\": {},        \"dateCreated\": \"2015-08-01T06:00:00.000Z\",        \"dateModified\": \"2015-09-02T11:30:00.000Z\"      },      \"action\": \"http://purl.imsglobal.org/vocab/caliper/v1/action#NavigatedTo\",      \"object\": {        \"@context\": \"http://purl.imsglobal.org/ctx/caliper/v1/Context\",        \"@id\": \"https://example.com/viewer/book/34843#epubcfi(/4/3)\",        \"@type\": \"http://www.idpf.org/epub/vocab/structure/#volume\",        \"name\": \"The Glorious Cause: The American Revolution, 1763-1789 (Oxford History of the United States)\",        \"description\": null,        \"objectType\": [],        \"alignedLearningObjective\": [],        \"keywords\": [],        \"isPartOf\": null,        \"extensions\": {},        \"dateCreated\": \"2015-08-01T06:00:00.000Z\",        \"dateModified\": \"2015-09-02T11:30:00.000Z\",        \"datePublished\": null,        \"version\": \"2nd ed.\"      },      \"eventTime\": \"2015-09-15T10:15:00.000Z\"    }  ]}";
  var obj = JSON.parse(dataStr);
  var pretty = JSON.stringify(obj, undefined, 4);

  var getServieURL = azureURL;
  var postServieURL = azureInputURL;
  var headerProp = azureHeaderProp;
  var headerKey = azureHeadeKey;

  $("#loaderId").hide();
  $("#loader2Id").hide();
  
  $(function() {
    $("#platformSelectID").change(function() {
        
        var selected = $('option:selected', this).text();
        if(selected=="AZURE"){
          getServieURL = azureURL;
          postServieURL = azureInputURL;
          headerProp = azureHeaderProp;
          headerKey = azureHeadeKey;
        }else{
          getServieURL = aswURL;
          postServieURL = aswInputURL;
          headerProp = awsHeaderProp;
          headerKey = awsHeaderKey;
        }
        $('#postServiceLblID').text("POST: "+postServieURL);
        $('#getServiceLblID').text("GET: "+getServieURL);
    });
  });

  $("#sendDataTextId").text(pretty);
  
  $(function() {

      $("#sendBtnId").click( function(){
        $("#errorLblId").text("");
        var data1= $("#sendDataTextId").val();
          if(data1==""){
            alert("Please insert some data!");
          }else{

              var params = {
            // Request parameters
              };
              $.ajax({
                url: postServieURL + $.param(params),
                beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader(headerProp,headerKey);
                  },
                  type: "POST",
            // Request body
                  contentType: "application/json",
                  data: JSON.stringify(JSON.parse(data1)),
              })
        .done(function(data) {
            //alert("success");
             $("#errorLblId").text( JSON.stringify(data) );
        })
        .fail(function() {
            alert("error");
             $("#errorLblId").text("error");
        });

        }

      });
  });

  $(function() {

      $("#getBtnId").click( function(){
        $("#loaderId").show();
        $('#dataTableContainerId').clear();
        $.ajax({
            url: getServieURL,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader(headerProp,headerKey);
            },
            type: "GET",
            // Request body
            data: "",
        })
        .done(function(data) {
             if(data){
             if(getServieURL!=azureURL){
                data = data.Items;
             }
              var container = $('#dataTableContainerId'),table = $('<table>');
              var th = $('<th>No.</th><th>Sensor</th><th>Send Time</th><th>Data Type</th><th>Action</th><th>Actor Id</th><th>Actor Name</th><th>Object Id</th><th>Object Name</th><th>Event Time</th>');
              table.append(th);

              var type = "@type";

              if(data instanceof Array){
                for(var i=0;i<data.length;i++){
                  //$el =$('<li  style="color:black;padding:5px;" >'+JSON.stringify(data[i],undefined,4)+'</li>');
                        //$("#ddbDataListId").append($el);
                         var tr = $('<tr>');
                          var obj = data[i];
                          tr.append('<td>' + (i+1) + '</td>');
                          tr.append('<td>' + obj.sensor + '</td>');
                          tr.append('<td>' + obj.sendTime + '</td>');
                          tr.append('<td>' + obj.data[0][type] + '</td>');
                          tr.append('<td>' + obj.data[0].action + '</td>');
                          tr.append('<td>' + obj.data[0].actor["@id"] + '</td>');
                          tr.append('<td>' + obj.data[0].actor["name"] + '</td>');
                          tr.append('<td>' + obj.data[0].object["@id"] + '</td>');
                          tr.append('<td>' + obj.data[0].object["name"] + '</td>');
                          tr.append('<td>' + obj.data[0].eventTime + '</td>');
                          table.append(tr);
                }
              }

          }
           $("#loaderId").hide();
           container.append(table);
        })
        .fail(function() {
            alert("error");
            $("#loaderId").hide();
        });
    });
  });


  $(function() {

      $("#getSqlBtnId").click( function(){
        $("#loader2Id").show();
        $('#dataTableContainer2Id').clear();
        $.ajax({
            url: azureSqlOutputURL,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader(azureHeaderProp,azureHeadeKey);
            },
            type: "GET",
            // Request body
            data: "",
        })
        .done(function(data) {
             if(data){
             if(getServieURL!=azureURL){
                data = data.Items;
             }
              var container = $('#dataTableContainer2Id'),table = $('<table>');
              var th = $('<th>No.</th><th>Sensor</th><th>Send Time</th><th>Action</th><th>Actor Id</th><th>Actor Name</th><th>Object Id</th><th>Object Name</th><th>Event Time</th>');
              table.append(th);

              if(data instanceof Array){
                for(var i=0;i<data.length;i++){
                  // $el =$('<li  style="color:black;" ><textarea rows="10" cols="60">'+JSON.stringify(data[i],undefined,4)+'</textarea></li>');
                  //       $("#dataListId").append($el);
                   var tr = $('<tr>');
                          var obj = data[i];
                          tr.append('<td>' + (i+1) + '</td>');
                          tr.append('<td>' + obj.sensor + '</td>');
                          tr.append('<td>' + obj.sendTime + '</td>');
                          tr.append('<td>' + obj.action + '</td>');
                          tr.append('<td>' + obj.actorId + '</td>');
                          tr.append('<td>' + obj.actorName + '</td>');
                          tr.append('<td>' + obj.objectId + '</td>');
                          tr.append('<td>' + obj.objectName + '</td>');
                          tr.append('<td>' + obj.eventTime + '</td>');
                          table.append(tr);
                }
              }

          }
          $("#loader2Id").hide();
           container.append(table);
        })
        .fail(function() {
            alert("error");
            $("#loader2Id").hide();
        });
    });
  });

});
