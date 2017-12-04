$(document).ready(function() {
    $('.modal').modal();
});
$('.code-scan').on('click', function() {
    var width = $(window).width();

    Quagga.init({
        inputStream : {
            name : "Live",
            type : "LiveStream",
            constraints: {
              width: width,
              height: 233
            }
        },
        decoder : {
            readers : ["code_128_reader"]
        },
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        console.log('Achei código de barras', code);
        Quagga.stop();
        $('#scan').modal('close');
        $('#codigo_ticket').focus().val(code);
    });
});


navigator.serviceWorker.register('sw.js');

$('body').on('submit', 'form', function(){
    Materialize.toast('Toast!!', 4000);

    var title = 'Pagamento confirmado';
    var options = {
        icon: 'img/icon.png', 
        body: 'Saída liberada'
    };

    if ('Notification' in window) {
        Notification.requestPermission();

        if ('showNotification' in ServiceWorkerRegistration.prototype) {
            console.log('Notification SW');
            navigator.serviceWorker.ready.then(function(registration){
                registration.showNotification(title, options);
            });
        } else {
            console.log('Notification classic');
            new Notification(title, options);
        }
    }

    return false;
});