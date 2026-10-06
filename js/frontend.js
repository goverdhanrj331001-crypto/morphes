(function ($) {
  const minute = Number(RBT_STORE_RESERVED_TIMER?.option_data?.timeout);
  const timerAction = RBT_STORE_RESERVED_TIMER?.option_data?.timer_action;
  const hideTimer = () => {
    $("body").find(".rbt-cart-header .rbt-quick-info-tag").addClass("d-none");
  };

  if( $('.no-cart-found-on-cart-page').length > 0 ) {
    $('.rbt-cart-timer').remove();
  }

  $(document).on('clear_cart_timer', function () {
    clearTimerAjax();
  });

  const clearTimerAjax = () => {
    $.ajax({
      url: RBT_STORE_RESERVED_TIMER.ajaxurl, // Ensure this is set correctly in PHP
      type: "POST",
      data: {
        nonce: RBT_STORE_RESERVED_TIMER.nonce,
        action: "rbt_store_clear_cart",
      },
      success: function (response) {
        const message = response?.data?.message;
        var $toaster = $(".rbt-store-toster");
        $toaster.text(message);
        $toaster.addClass("is-visible");
        setTimeout(function () {
          $toaster.removeClass("is-visible");
        }, 3000);
        $('.unimart-mini-cart-content').html(`<h5 class="mt-3 rbt-empty-cart">${window?.RBT_STORE_CART?.cart_empty_title || "No Cart Found"}</h5>`);
        $('.rbt-mini-cart .access-box-count').text(0);
      },
      error: function (errorThrown) {
        console.log(errorThrown);
      },
    });
  };


  // Use a global variable to store the countdown interval so it can be cleared across invocations
  let rbt_cart_timer_interval = null;
  let rbt_cart_timer_current = null;

  const RBT_Cart_Timer_Count = function (forceReset = false) {
    const option_data = RBT_STORE_RESERVED_TIMER?.option_data;
    if( !option_data?.enable_cart_timer ) {
      return;
    }

    const cart_timer_memory = +option_data?.cart_timer_memory;

    var countdownDisplay = $(".rbt-countdown-cart");
      const timer_duration = +countdownDisplay.data('timer-duration');
      var countdownDuration = cart_timer_memory > 0 ? cart_timer_memory : timer_duration * 60;
      // var countdownDuration = 5;
      var countdownInterval = null;
      var timer = countdownDuration;

      function startCountdown() {
        if (countdownInterval) return;


        if( timer === null ) {
          return;
        }

        countdownInterval = setInterval(function () {
          var minutes = Math.floor(timer / 60);
          var seconds = timer % 60;

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          countdownDisplay.text(minutes + "m " + seconds + "s");
          $('.rbt-cart-timer-memory').val(timer);

          if( timer > 0 ) {
            timer--;
          }

          if (timer == 0) {
            clearInterval(countdownInterval);
            
            countdownDisplay.text("Time's up!");
            countdownInterval = null;
            timer = null;

            if( option_data?.timer_action === 'redirect_checkout' ) {
              const is_cart_empty =$(document).trigger('is_cart_empty');
              if( !is_cart_empty ||  window.location.href !== option_data?.checkout_url) {
                window.location.href = option_data?.checkout_url;
              }
            }
            if( option_data?.timer_action === 'clear_cart' ) {
              $(document).trigger('clear_cart');
            }
          }
        }, 1000);
      }


      function stopCountdown() {
        clearInterval(countdownInterval);
        countdownDisplay.text("Time's up!");
        countdownInterval = null;
      }

      function resetCountdown() {
        stopCountdown();
        timer = countdownDuration;
      }

      var body = $("body");

      if( forceReset ) {
        resetCountdown();
        return;
      }

      // Check page state every second
      if (body.hasClass("woocommerce-cart") || $(document).find('.rbt-sidebar-cart').length !== 0) {
        startCountdown();
      } else {
        resetCountdown();
      }
      // setInterval(function () {
      // }, 1000);
  }



  $(document).on('start_cart_timer', function(event, forceReset = false) {
    RBT_Cart_Timer_Count(forceReset);
    
    $(document).trigger('rbt_store_update_cart_timer');
  });

  $(document).trigger('start_cart_timer');
 

  var rbtJs = {
    i: function () {
      rbtJs.d();
      rbtJs.methods();
      rbtJs.triggers();
    },
    d: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html")),
        (this.sideNav = $(".rbt-search-dropdown"));
    },
    triggers: () => {
      $(document).on('rbt_store_update_cart_timer', rbtJs.update_cart_timer_markup);
    },
    methods: () => {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          rbtJs.cart_timer_memory($('input.rbt-cart-timer-memory').val() || 0);
        }
      });
    },
    update_cart_timer_markup: function() {
        $.ajax({
          url: RBT_STORE_CART.ajaxurl,
          type: 'POST',
          data: {
              nonce: RBT_STORE_CART.nonce,
              action: 'rbt_store_is_cart_empty',
          },
          success: function(response) {
            const is_cart_empty = response?.is_cart_empty;
            if( ! is_cart_empty ) {
              $('.rbt-cart-header .rbt-quick-info-tag').removeClass('d-none').addClass('d-flex');
            }else {
              $('.rbt-cart-header .rbt-quick-info-tag').addClass('d-none');
            }
          },
          error: function(error) {
              console.log(error);
              return false;
          },
      });
    },
    cart_timer_memory: function (time) {
      $.ajax({
        url: RBT_STORE_RESERVED_TIMER.ajaxurl,
        type: "POST",
        data: {
          nonce: RBT_STORE_RESERVED_TIMER.nonce,
          action: "rbt_store_cart_timer_memory",
          time: time,
        },
        // success: function (response) {
        //   console.log(response);
        // },
        error: function (error) {
          console.log(error);
        },
      });
    },
  };
  $(window).ready(() => {
    rbtJs.i();
  });
})(jQuery);
