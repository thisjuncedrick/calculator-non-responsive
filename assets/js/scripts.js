$(document).ready(function () {
  $(document).on("input", ".switch", function () {
    const toggler = $(this).find("input").is(":checked");
    if (toggler) {
      $("body").addClass("light");
    } else {
      $("body").removeClass("light");
    }
  });

  const percent = (text) => {
    return Number(text) * 0.1;
  };

  let last_value;
  let last_function;
  let total;

  $(".key").click(function (e) {
    e.preventDefault();
    const data_function = $(this).data("function");
    const data_value = $(this).data("value");
    let text = $(".expression").text();

    if (data_function === "numbers") {
      $(".expression").append(data_value);
    } else {
      switch (data_function) {
        case "clear-all":
          $(".expression").empty();
          $(".total").empty();
          break;
        case "clear":
          text = text.substring(0, text.length - 1);
          $(".expression").text(text);
          break;
        case "decimal":
          // Append decimal point only if it's not already present
          if (text === "") {
            // If expression is empty, append '0.' at the start
            $(".expression").text("0.");
          } else if (!text.includes(".")) {
            // Append decimal point only if it's not already present
            $(".expression").append(data_value);
          }
          break;
        case "operation":
          // Replace current expression with the total when the user appends operation after totalling
          if ($(".total").text() != "") {
            $(".expression").text($(".total").text());
            $(".total").text("");
          }
          if (last_function === "operation") {
            // Replace the last operation with the current one
            text = text.substring(0, text.length - 1);
            $(".expression").text(text);
          }
          // Append the current operation
          $(".expression").append(data_value);
          break;
        case "equals":
          // Evaluate the expression and display the result
          const result = eval($(".expression").text());
          $(".total").text(result);
          total = result;
          break;
      }
    }

    last_function = data_function;
    last_value = data_value;
  });
});
