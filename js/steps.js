;(function(){

  // $(".step:nth-child(1)").addClass("active")
  const selector = "#contact-form"

  $(".step textarea").on("keydown", (ev) => {
    if (ev.keyCode == 13) {
      ev.preventDefault()
      $(ev.target).blur()
    }
  })

  $(".path-step").on("click",(ev)=>{
    const $current_circle = $(ev.target)

    focus_circle($current_circle)

    const posicion = $current_circle.index(".path-step") + 1

    let $test = $(".step:nth-child("+posicion+")")

    siguiente($test)

  })

  $(selector).find(".input").on("change", (ev)=>{
    const $input = $(ev.target)

    const $next_step = $input.parent().next(".step")

    const is_form_valid = form_is_valid()

    if (!is_form_valid && $next_step.length > 0) {
      siguiente($next_step)
    }else{
      validate_form()
    }



  })

  // Helpers

  function validate_form(){
    if (form_is_valid()) {
      send_form()
    }else{
      let $fieldset_invalido = $(selector).find(".input:invalid").first().parent()
      siguiente($fieldset_invalido)
    }
  }

  function form_is_valid(){
    return document.querySelector(selector).checkValidity()
  }

  function siguiente($next_step){
    $(".step.active").removeClass("active")
    $next_step.addClass("active")
    $next_step.find(".input").focus()

    //Coordinar los circulos
    const posicion = ($next_step.index(".step")) + 1

    $(".path-step.active").removeClass("active")
    const $circle = $(".path-step:nth-child("+posicion+")").addClass("active")

    focus_circle($circle)
    // $next_input.focus()
  }

  function focus_circle($circle){
    $(".path-step.active").removeClass("active")
    $circle.addClass("active")
  }

  function send_form(){
    const $form = $(selector)
    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: $form.formObject(),
      dataType: "json",
      success: function(){
        $form.slideUp()
        $("#info-contacto").html("Recibimos tu mensaje, pronto nos pondremos en contacto contigo")
        swal("Good job!","El envio salio bien","success")
      }
    })
  }

})()