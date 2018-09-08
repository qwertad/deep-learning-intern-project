// Car1
    // 車號上傳部分
        $(document).ready(function () {
            $("#LPN1").change(function(){
                var form_data = new FormData($('#LPN_1')[0]);
                // $('#invoice1').disabled(false);
                // 將資料傳向後端
                $.ajax({
                    type: 'POST',
                    url: '/plate_rec',
                    data: form_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                      $('#invoice1').val(data);
                      $("#checkbox1car").attr("checked",true);
                    console.log('Success!');

                    },
                    error: function(textStatus) {
                      console.log('Error!');
                      $('#invoice1').val("");
                      $("#checkbox1car").attr("checked",false);
                    }  
                });
            });
        });

    //車種選項
        $(document).ready(function () {

            $('input[type=radio][name=cartype1]').change(function() {

                $("#photo1_imgs").html(""); 
                // 清除預覽
                document.getElementById("photo_1").reset();
                for (var i = 0; i < 9; i++) { 
                    if(i == '0'){
                        $("#checkbox1box").attr("checked",false);}
                    if(i == '1'){
                        $("#checkbox1car").attr("checked",false);}
                    if(i == '2'){  
                        $("#checkbox1empty").attr("checked",false);}
                    if(i == '3'){
                        $("#checkbox1full").attr("checked",false);}
                    if(i == '4'){
                        $("#checkbox1label").attr("checked",false);}
                    if(i == '5'){  
                        $("#checkbox1Tempty").attr("checked",false);}
                    if(i == '6'){
                        $("#checkbox1Tfull").attr("checked",false);}
                    if(i == '7'){  
                        $("#checkbox1Fempty").attr("checked",false);}
                    if(i == '8'){
                        $("#checkbox1Ffull").attr("checked",false);}
                }

                if (this.value == '0') {
                    $('.checkbox1').show();
                    $('.checkbox1T').hide();
                    $('.checkbox1F').hide();
                    console.log($("#invoice1").val());
                }else if(this.value == '1') {
                    $('.checkbox1').hide();
                    $('.checkbox1T').show();
                    $('.checkbox1F').hide();
                }else if(this.value == '2'){
                    $('.checkbox1').hide();
                    $('.checkbox1T').hide();
                    $('.checkbox1F').show();
                }
            });
        });


    //圖片上傳
        $(document).ready(function () {
            $("#photodel1").click(function(){
                $("#photo1_imgs").html(""); // 清除預覽
                document.getElementById("photo_1").reset();

                $('#result').text('');
                $('#resultX').text('');

                for (var i = 0; i < 9; i++) { 
                    if(i == '0'){
                        $("#checkbox1box").attr("checked",false);}
                    if(i == '1'){
                        $("#checkbox1car").attr("checked",false);}
                    if(i == '2'){  
                        $("#checkbox1empty").attr("checked",false);}
                    if(i == '3'){
                        $("#checkbox1full").attr("checked",false);}
                    if(i == '4'){
                        $("#checkbox1label").attr("checked",false);}
                    if(i == '5'){  
                        $("#checkbox1Tempty").attr("checked",false);}
                    if(i == '6'){
                        $("#checkbox1Tfull").attr("checked",false);}
                    if(i == '7'){  
                        $("#checkbox1Fempty").attr("checked",false);}
                    if(i == '8'){
                        $("#checkbox1Ffull").attr("checked",false);}
                }   
            });

            $('#photo1').change(function () {

                var form_data = new FormData($('#photo_1')[0]);
                form_data.append("invoice1", $("#invoice1").val());

                $('#result').text('');
                $('#resultX').text('');

                //取得車種value       
                if ($('input[name=cartype1]:checked').val() == '0') {
                    //集裝箱
                    $.ajax({
                        type: 'POST',
                        url: '/predict',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                            for (var i = 0; i < check.length; i++) { 
                                if(check[i] == '0'){
                                    $("#checkbox1box").attr("checked",true);}
                                if(check[i] == '1'){
                                    $("#checkbox1car").attr("checked",true);}
                                if(check[i] == '2'){  
                                    $("#checkbox1empty").attr("checked",true);}
                                if(check[i] == '3'){
                                    $("#checkbox1full").attr("checked",true);}
                                if(check[i] == '4'){
                                    $("#checkbox1label").attr("checked",true);}
                            }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }else if($('input[name=cartype1]:checked').val() == '1'){
                    //平板車
                    $.ajax({
                        type: 'POST',
                        url: '/cnn_flat',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '3'){
                                        $("#checkbox1Tempty").attr("checked",true);}
                                    if(check[i] == '5'){
                                        $("#checkbox1Tempty").attr("checked",true);}
                                    if(check[i] == '2'){
                                        $("#checkbox1Tcar").attr("checked",true);}
                                    if(check[i] == '6'){  
                                        $("#checkbox1Tfull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');

                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });

                }else if($('input[name=cartype1]:checked').val() == '2'){
                    //飛裔車
                    $.ajax({
                        type: 'POST',
                        url: '/cnn_fly',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '4'){
                                        $("#checkbox1Fempty").attr("checked",true);}
                                    if(check[i] == '2'){
                                        $("#checkbox1Fcar").attr("checked",true);}
                                    if(check[i] == '6'){  
                                        $("#checkbox1Ffull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }

                $.ajax({
                        type: 'POST',
                        url: '/img_quality',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {
                            $('#resultX').text(data);
                            console.log('Success!');                                   
                        },
                        error: function(textStatus) {
                            $('#resultX').text('');
                            console.log('Error!');
                        }             
                    });
            });
        });
            

    //確定上傳
        $(document).ready(function () {
            $("#done1").click(function(){
                //清除車號
                    $("#LPN1_imgs").html(""); // 清除預覽
                    $('#invoice1').val(' ');
                    $("#checkbox1car").attr("checked",false);
                //清除圖片
                    $("#photo1_imgs").html(""); // 清除預覽
                    document.getElementById("photo_1").reset();
                    $('#resultX').text('');
                    $('#result').text('');
                //清除判斷
                    for (var i = 0; i < 9; i++) { 
                        if(i == '0'){
                            $("#checkbox1box").attr("checked",false);}
                        if(i == '1'){
                            $("#checkbox1car").attr("checked",false);}
                        if(i == '2'){  
                            $("#checkbox1empty").attr("checked",false);}
                        if(i == '3'){
                            $("#checkbox1full").attr("checked",false);}
                        if(i == '4'){
                            $("#checkbox1label").attr("checked",false);}
                        if(i == '5'){  
                            $("#checkbox1Tempty").attr("checked",false);}
                        if(i == '6'){
                            $("#checkbox1Tfull").attr("checked",false);}
                        if(i == '7'){  
                            $("#checkbox1Fempty").attr("checked",false);}
                        if(i == '8'){
                            $("#checkbox1Ffull").attr("checked",false);}
                    }   
            });
        });


// Car2
    // 車號上傳部分
        $(document).ready(function () {

            $("#LPN2").change(function(){
                var form_data = new FormData($('#LPN_2')[0]);
                // 將資料傳向後端
                $.ajax({
                    type: 'POST',
                    url: '/plate_rec',
                    data: form_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                      $('#invoice2').val('車號： ' + data);
                      $("#checkbox2car").attr("checked",true);
                    console.log('Success!');

                    },
                    error: function(textStatus) {
                      console.log('Error!');
                      $('#invoice2').val("");
                      $("#checkbox2car").attr("checked",false);
                    }  
                });
            });
        });

    //車種選項\
        $(document).ready(function () {
            $('input[type=radio][name=cartype2]').change(function() {
                if (this.value == '0') {
                    $('.checkbox2').show();
                    $('.checkbox2T').hide();
                    $('.checkbox2F').hide();
                }else if(this.value == '1') {
                    $('.checkbox2').hide();
                    $('.checkbox2T').show();
                    $('.checkbox2F').hide();
                }else if(this.value == '2'){
                    $('.checkbox2').hide();
                    $('.checkbox2T').hide();
                    $('.checkbox2F').show();
                }
                // $.ajax({
                //     type: 'POST',
                //     url: '/plate_rec',
                //     data: form_data,
                //     contentType: false,
                //     cache: false,
                //     processData: false,
                //     async: true,
                //     success: function (data) {
                //       console.log('Success!');
                //     },
                //     error: function(textStatus) {
                //       console.log('Error!');
                //     }  
                // });
            });
        });


    //圖片上傳
        $(document).ready(function () {

            $("#photodel2").click(function(){
                $("#photo2_imgs").html(""); // 清除預覽
                document.getElementById("photo_2").reset();

                for (var i = 0; i < 9; i++) { 
                    if(i == '0'){
                        $("#checkbox2box").attr("checked",false);}
                    if(i == '1'){
                        $("#checkbox2car").attr("checked",false);}
                    if(i == '2'){  
                        $("#checkbox2empty").attr("checked",false);}
                    if(i == '3'){
                        $("#checkbox2full").attr("checked",false);}
                    if(i == '4'){
                        $("#checkbox2label").attr("checked",false);}
                    if(i == '5'){  
                        $("#checkbox2Tempty").attr("checked",false);}
                    if(i == '6'){
                        $("#checkbox2Tfull").attr("checked",false);}
                    if(i == '7'){  
                        $("#checkbox2Fempty").attr("checked",false);}
                    if(i == '8'){
                        $("#checkbox2Ffull").attr("checked",false);}
                }   

            });

            $('#photo2').change(function () {

                // var form_data = new FormData($('#photo_1')[0]);

                // var form_data = new FormData();
                // form_data.append("photo", $('#photo_1')[0]);
                // form_data.append("LPN", $("#invoice1").val());

                $('#result').text('');

                //取得車種value       
                if ($('input[name=cartype2]:checked').val() == '0') {
                    //JQuery
                    $.ajax({
                        type: 'POST',
                        url: '/predict',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                            for (var i = 0; i < check.length; i++) { 
                                if(check[i] == '0'){
                                    $("#checkbox2box").attr("checked",true);}
                                if(check[i] == '1'){
                                    $("#checkbox2car").attr("checked",true);}
                                if(check[i] == '2'){  
                                    $("#checkbox2empty").attr("checked",true);}
                                if(check[i] == '3'){
                                    $("#checkbox2full").attr("checked",true);}
                                if(check[i] == '4'){
                                    $("#checkbox2label").attr("checked",true);}
                            }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }else if($('input[name=cartype2]:checked').val() == '1'){
                    //平板車
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '3'){
                                        $("#checkbox2Tempty").attr("checked",true);}
                                    if(check[i] == '6'){
                                        $("#checkbox2Tempty").attr("checked",true);}
                                    // if(check[i] == '0'){
                                    //     $("#checkbox2Tcar").attr("checked",true);}
                                    if(check[i] == '7'){  
                                        $("##checkbox2Tfull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');

                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });

                }else if($('input[name=cartype2]:checked').val() == '2'){
                    //JQuery
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '5'){
                                        $("#checkbox2Fempty").attr("checked",true);}
                                    // if(check[i] == '0'){
                                    //     $("#checkbox2Fcar").attr("checked",true);}
                                    if(check[i] == '9'){  
                                        $("##checkbox2Ffull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }
            });
        });
            

    //確定上傳
        $(document).ready(function () {
            $("#done2").click(function(){
                //清除車號
                    $("#LPN2_imgs").html(""); // 清除預覽
                    $('#invoice2').val(' ');
                    $("#checkbox2car").attr("checked",false);
                //清除圖片
                    $("#photo2_imgs").html(""); // 清除預覽
                    document.getElementById("photo_2").reset();
                //清除判斷
                    for (var i = 0; i < 9; i++) { 
                        if(i == '0'){
                            $("#checkbox2box").attr("checked",false);}
                        if(i == '1'){
                            $("#checkbox2car").attr("checked",false);}
                        if(i == '2'){  
                            $("#checkbox2empty").attr("checked",false);}
                        if(i == '3'){
                            $("#checkbox2full").attr("checked",false);}
                        if(i == '4'){
                            $("#checkbox2label").attr("checked",false);}
                        if(i == '5'){  
                            $("#checkbox2Tempty").attr("checked",false);}
                        if(i == '6'){
                            $("#checkbox2Tfull").attr("checked",false);}
                        if(i == '7'){  
                            $("#checkbox2Fempty").attr("checked",false);}
                        if(i == '8'){
                            $("#checkbox2Ffull").attr("checked",false);}
                    }   
            });
        });

// Car3
    // 車號上傳部分
        $(document).ready(function () {
            $("#LPN3").change(function(){
                var form_data = new FormData($('#LPN_3')[0]);
                // 將資料傳向後端
                $.ajax({
                    type: 'POST',
                    url: '/plate_rec',
                    data: form_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                      $('#invoice3').val('車號： ' + data);
                      $("#checkbox3car").attr("checked",true);
                    console.log('Success!');

                    },
                    error: function(textStatus) {
                      console.log('Error!');
                      $('#invoice3').val("");
                      $("#checkbox3car").attr("checked",false);
                    }  
                });
            });
        });

    //車種選項
        $(document).ready(function () {
            $('input[type=radio][name=cartype3]').change(function() {
                if (this.value == '0') {
                    $('.checkbox3').show();
                    $('.checkbox3T').hide();
                    $('.checkbox3F').hide();
                }else if(this.value == '1') {
                    $('.checkbox3').hide();
                    $('.checkbox3T').show();
                    $('.checkbox3F').hide();
                }else if(this.value == '2'){
                    $('.checkbox3').hide();
                    $('.checkbox3T').hide();
                    $('.checkbox3F').show();
                }
                // $.ajax({
                //     type: 'POST',
                //     url: '/plate_rec',
                //     data: form_data,
                //     contentType: false,
                //     cache: false,
                //     processData: false,
                //     async: true,
                //     success: function (data) {
                //       console.log('Success!');
                //     },
                //     error: function(textStatus) {
                //       console.log('Error!');
                //     }  
                // });
            });
        });


    //圖片上傳
        $(document).ready(function () {

            $("#photodel3").click(function(){
                $("#photo3_imgs").html(""); // 清除預覽
                document.getElementById("photo_3").reset();

                for (var i = 0; i < 9; i++) { 
                    if(i == '0'){
                        $("#checkbox3box").attr("checked",false);}
                    if(i == '1'){
                        $("#checkbox3car").attr("checked",false);}
                    if(i == '2'){  
                        $("#checkbox3empty").attr("checked",false);}
                    if(i == '3'){
                        $("#checkbox3full").attr("checked",false);}
                    if(i == '4'){
                        $("#checkbox3label").attr("checked",false);}
                    if(i == '5'){  
                        $("#checkbox3Tempty").attr("checked",false);}
                    if(i == '6'){
                        $("#checkbox3Tfull").attr("checked",false);}
                    if(i == '7'){  
                        $("#checkbox3Fempty").attr("checked",false);}
                    if(i == '8'){
                        $("#checkbox3Ffull").attr("checked",false);}
                }   

            });

            $('#photo3').change(function () {

                // var form_data = new FormData($('#photo_1')[0]);

                // var form_data = new FormData();
                // form_data.append("photo", $('#photo_1')[0]);
                // form_data.append("LPN", $("#invoice1").val());

                $('#result').text('');

                //取得車種value       
                if ($('input[name=cartype3]:checked').val() == '0') {
                    //JQuery
                    $.ajax({
                        type: 'POST',
                        url: '/predict',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                            for (var i = 0; i < check.length; i++) { 
                                if(check[i] == '0'){
                                    $("#checkbox3box").attr("checked",true);}
                                if(check[i] == '1'){
                                    $("#checkbox3car").attr("checked",true);}
                                if(check[i] == '2'){  
                                    $("#checkbox3empty").attr("checked",true);}
                                if(check[i] == '3'){
                                    $("#checkbox3full").attr("checked",true);}
                                if(check[i] == '4'){
                                    $("#checkbox3label").attr("checked",true);}
                            }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }else if($('input[name=cartype3]:checked').val() == '1'){
                    //平板車
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '3'){
                                        $("#checkbox3Tempty").attr("checked",true);}
                                    if(check[i] == '6'){
                                        $("#checkbox3Tempty").attr("checked",true);}
                                    // if(check[i] == '0'){
                                    //     $("#checkbox3Tcar").attr("checked",true);}
                                    if(check[i] == '7'){  
                                        $("##checkbox3Tfull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');

                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });

                }else if($('input[name=cartype3]:checked').val() == '2'){
                    //JQuery
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '5'){
                                        $("#checkbox3Fempty").attr("checked",true);}
                                    // if(check[i] == '0'){
                                    //     $("#checkbox3Fcar").attr("checked",true);}
                                    if(check[i] == '9'){  
                                        $("##checkbox3Ffull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }
            });
        });
            

    //確定上傳
        $(document).ready(function () {
            $("#done3").click(function(){
                //清除車號
                    $("#LPN3_imgs").html(""); // 清除預覽
                    $('#invoice3').val(' ');
                    $("#checkbox3car").attr("checked",false);
                //清除圖片
                    $("#photo3_imgs").html(""); // 清除預覽
                    document.getElementById("photo_3").reset();
                //清除判斷
                    for (var i = 0; i < 9; i++) { 
                        if(i == '0'){
                            $("#checkbox3box").attr("checked",false);}
                        if(i == '1'){
                            $("#checkbox3car").attr("checked",false);}
                        if(i == '2'){  
                            $("#checkbox3empty").attr("checked",false);}
                        if(i == '3'){
                            $("#checkbox3full").attr("checked",false);}
                        if(i == '4'){
                            $("#checkbox3label").attr("checked",false);}
                        if(i == '5'){  
                            $("#checkbox3Tempty").attr("checked",false);}
                        if(i == '6'){
                            $("#checkbox3Tfull").attr("checked",false);}
                        if(i == '7'){  
                            $("#checkbox3Fempty").attr("checked",false);}
                        if(i == '8'){
                            $("#checkbox3Ffull").attr("checked",false);}
                    }   
            });
        });

// Car4
    // 車號上傳部分
        $(document).ready(function () {
            $("#LPN4").change(function(){
                var form_data = new FormData($('#LPN_4')[0]);
                // 將資料傳向後端
                $.ajax({
                    type: 'POST',
                    url: '/plate_rec',
                    data: form_data,
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: true,
                    success: function (data) {
                      $('#invoice4').val('車號： ' + data);
                      $("#checkbox4car").attr("checked",true);
                    console.log('Success!');

                    },
                    error: function(textStatus) {
                      console.log('Error!');
                      $('#invoice4').val("");
                      $("#checkbox4car").attr("checked",false);
                    }  
                });
            });
        });

    //車種選項
        $(document).ready(function () {
            $('input[type=radio][name=cartype4]').change(function() {
                if (this.value == '0') {
                    $('.checkbox4').show();
                    $('.checkbox4T').hide();
                    $('.checkbox4F').hide();
                }else if(this.value == '1') {
                    $('.checkbox4').hide();
                    $('.checkbox4T').show();
                    $('.checkbox4F').hide();
                }else if(this.value == '2'){
                    $('.checkbox4').hide();
                    $('.checkbox4T').hide();
                    $('.checkbox4F').show();
                }
                // $.ajax({
                //     type: 'POST',
                //     url: '/plate_rec',
                //     data: form_data,
                //     contentType: false,
                //     cache: false,
                //     processData: false,
                //     async: true,
                //     success: function (data) {
                //       console.log('Success!');
                //     },
                //     error: function(textStatus) {
                //       console.log('Error!');
                //     }  
                // });
            });
        });


    //圖片上傳
        $(document).ready(function () {

            $("#photodel4").click(function(){
                $("#photo4_imgs").html(""); // 清除預覽
                document.getElementById("photo_4").reset();

                for (var i = 0; i < 9; i++) { 
                    if(i == '0'){
                        $("#checkbox4box").attr("checked",false);}
                    if(i == '1'){
                        $("#checkbox4car").attr("checked",false);}
                    if(i == '2'){  
                        $("#checkbox4empty").attr("checked",false);}
                    if(i == '3'){
                        $("#checkbox4full").attr("checked",false);}
                    if(i == '4'){
                        $("#checkbox4label").attr("checked",false);}
                    if(i == '5'){  
                        $("#checkbox4Tempty").attr("checked",false);}
                    if(i == '6'){
                        $("#checkbox4Tfull").attr("checked",false);}
                    if(i == '7'){  
                        $("#checkbox4Fempty").attr("checked",false);}
                    if(i == '8'){
                        $("#checkbox4Ffull").attr("checked",false);}
                }   

            });

            $('#photo4').change(function () {

                // var form_data = new FormData($('#photo_1')[0]);

                // var form_data = new FormData();
                // form_data.append("photo", $('#photo_1')[0]);
                // form_data.append("LPN", $("#invoice1").val());

                $('#result').text('');

                //取得車種value       
                if ($('input[name=cartype4]:checked').val() == '0') {
                    //JQuery
                    $.ajax({
                        type: 'POST',
                        url: '/predict',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                            for (var i = 0; i < check.length; i++) { 
                                if(check[i] == '0'){
                                    $("#checkbox4box").attr("checked",true);}
                                if(check[i] == '1'){
                                    $("#checkbox4car").attr("checked",true);}
                                if(check[i] == '2'){  
                                    $("#checkbox4empty").attr("checked",true);}
                                if(check[i] == '3'){
                                    $("#checkbox4full").attr("checked",true);}
                                if(check[i] == '4'){
                                    $("#checkbox4label").attr("checked",true);}
                            }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }else if($('input[name=cartype4]:checked').val() == '1'){
                    //平板車
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '3'){
                                        $("#checkbox4Tempty").attr("checked",true);}
                                    if(check[i] == '6'){
                                        $("#checkbox4Tempty").attr("checked",true);}
                                    // if(check[i] == '0'){
                                    //     $("#checkbox4Tcar").attr("checked",true);}
                                    if(check[i] == '7'){  
                                        $("##checkbox4Tfull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');

                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });

                }else if($('input[name=cartype4]:checked').val() == '2'){
                    //JQuery
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: form_data,
                        contentType: false,
                        cache: false,
                        processData: false,
                        async: true,
                        success: function(data) {

                            var check = JSON.parse(data);
                            
                                for (var i = 0; i < check.length; i++) { 
                                    if(check[i] == '5'){
                                        $("#checkbox4Fempty").attr("checked",true);}
                                    // if(check[i] == '0'){
                                    //     $("#checkbox4Fcar").attr("checked",true);}
                                    if(check[i] == '9'){  
                                        $("##checkbox4Ffull").attr("checked",true);}
                                }       
                           
                            console.log('Success!');
                        },
                        error: function(textStatus) {
                            $('#result').text('請重新上傳照片');
                            console.log('Error!');
                        }             
                    });
                }
            });
        });
            

    //確定上傳
        $(document).ready(function () {
            $("#done4").click(function(){
                //清除車號
                    $("#LPN4_imgs").html(""); // 清除預覽
                    $('#invoice4').val(' ');
                    $("#checkbox4car").attr("checked",false);
                //清除圖片
                    $("#photo4_imgs").html(""); // 清除預覽
                    document.getElementById("photo_4").reset();
                //清除判斷
                    for (var i = 0; i < 9; i++) { 
                        if(i == '0'){
                            $("#checkbox4box").attr("checked",false);}
                        if(i == '1'){
                            $("#checkbox4car").attr("checked",false);}
                        if(i == '2'){  
                            $("#checkbox4empty").attr("checked",false);}
                        if(i == '3'){
                            $("#checkbox4full").attr("checked",false);}
                        if(i == '4'){
                            $("#checkbox4label").attr("checked",false);}
                        if(i == '5'){  
                            $("#checkbox4Tempty").attr("checked",false);}
                        if(i == '6'){
                            $("#checkbox4Tfull").attr("checked",false);}
                        if(i == '7'){  
                            $("#checkbox4Fempty").attr("checked",false);}
                        if(i == '8'){
                            $("#checkbox4Ffull").attr("checked",false);}
                    }   
            });
        });
