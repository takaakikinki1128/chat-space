$(function(){
  function buildHTML(message){
   
    if (message.image.url){
    var msg_url = '<img src="' + message.image.url + '" class="lower-message__image" >' 
  }else{
    var msg_url = ""
  };
    var html = '<div class="message" data-id=' + message.id + '>' +
          '<div class="upper-message">' +
            '<div class="upper-message__user-name">' +
              message.user_name +
            '</div>' +
            '<div class="upper-message__date">' +
              message.created_at +
            '</div>' +
          '</div>' +
          '<div class="lower-message">' +
            '<p class="lower-message__content">' +
              message.content +
            '</p>' + 
            msg_url+
          '</div>' +
        '</div>'


                  return html;
  }



  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
    
        var html = buildHTML(data);
        
        $('.messages').append(html);
        $('#new_message').val();
        
        $('.form__submit').prop('disabled',false);
        $('.messages').animate({
          scrollTop: $(".messages")[0].scrollHeight},1500);
  
    })
  
    .fail(function(){
        alert('error');
        $('.form__submit').prop('disabled',false);
    })
  });
   
    
   
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $(".message:last").data('id');
      var url = $('#new_message').attr("action")
      url = url.replace("/messages","/api/messages")
      console.log(url)
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: url,
       
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {

        console.log('success');
        messages.forEach(function(message){

        
         //メッセージが入ったHTMLを取得
         var html = buildHTML(message)
         //メッセージを追加
        $('.messages').append(html)
        $('.messages').animate({
        scrollTop: $(".messages")[0].scrollHeight},1500);


        });
      })
      .fail(function() {
        console.log('error');
      });  
      
      
    
    };
    setInterval(reloadMessages, 5000);

});