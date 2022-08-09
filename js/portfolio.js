$(document).ready(function () {
    $("img").on('click', function () {
        let t = $(this).attr("src");
        $("#img-body").html("<img src='" + t + "' class='modal-img mx-auto d-block'>");
        $('#myModal').modal({keyboard: true})
    });

    // clicking any place on the webpage will exit the modal
    $("#myModal").click(function () {
        $(this).modal('toggle');
    });

    // start of the funciton to align modal to the center
    function alignModal() {
        let modalDialog = $(".modal-dialog");
        /* Applying the top margin on modal dialog to align it vertically center */
        if ($(window).width() < 800) {
            $(modalDialog).css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 4));
        } else {
            $(modalDialog).css("margin", "0");
            $(modalDialog).css('max-height', '100%');
            $(modalDialog).css('max-weight', '100%');
            $(modalDialog).css('overflow', '');
        }
    }

    // Align modal when it is displayed
    $(".modal").on("shown.bs.modal", alignModal);

    // Align modal when user resize the window
    $(window).on("resize", function () {
        $(".modal:visible").each(alignModal);
    });
    // end of the function

    // searching
    let images = $('.img-responsive');
    // event listener for any key pressed in the search bar
    $("#searchInput").on('keyup', function () {
        // define and store the user input and transform it to lowercase
        let search = $('#searchInput').val().toLowerCase();
        // loop through the list items of the gallery
        for (let i = 0; i < images.length; i++) {
            // actualImg denotes the <img> tag, since it is
            let txtValue = String($(images[i]).attr('src'));
            if (txtValue.indexOf((search)) > -1) {
                $(images[i]).css("display", "");
            } else {
                $(images[i]).css("display", "none");
            }
        }
    });

    // Event triggered by pressing on "Newest" or "Oldest" in the tool bar of the gallery page
    $('.sortBy').click(function () {
        // initialising variables
        let images = $('.img-responsive');
        let imgDateArr = {};
        let imgNode = {};
        let gallery = $('#gallery');
        let galleryLen = images.length;

        for (let i = 0; i < galleryLen; i < i++) {
            // Store all the html contents of all list items in the unordered list (ul) in the array imgNode[]
            imgNode[i] = images.get(i).outerHTML;
            console.log(imgNode[i]);
            /*Retrieve all data-date values from the gallery to the array imgDateArr[]
            "data-date" is a self-defined attribute. Can be added manually in html files;
            or the user can upload all images using the upload functionality in this website and the code will
            create this attribute using the input date.
            */
            let strDate = String($(images[i]).attr('data-date'));
            imgDateArr[i] = parseInt(strDate.substring(6) + strDate.substring(3, 5) + strDate.substring(0, 2));
        }
        // remove all list items -> all images removed
        gallery.empty();

        function swapping(i, j) {
            let tempDate = imgDateArr[i];
            imgDateArr[i] = imgDateArr[j];
            imgDateArr[j] = tempDate;

            // swapping the date's corresponding html text
            let tempNode = imgNode[i];
            imgNode[i] = imgNode[j];
            imgNode[j] = tempNode;
        }

        // Loop to compare the date of every image (using value from attribute "data-date")
        for (let i = 0; i < galleryLen - 1; i++) {
            for (let j = i + 1; j < galleryLen; j++) {
                /*
                    example data-date value: "01-04-2005"
                    substring(6) will return: "2005"
                    substring(3,5) will return: "04"
                    substring(0,2) will return: "01"
                 */
                let currDateVal = imgDateArr[i];
                let cfDateVal = imgDateArr[j]; // cf. short for Latin word confer or conferatur, means "compare"
                // case: user clicked on "Newest"
                if ($(this).attr('id').toLowerCase() === "newest") {
                    // if the current image's date is newer/larger than the date of the image comparing, swap them
                    if (currDateVal < cfDateVal) {
                        swapping(i, j);
                    }
                }
                // case: user clicked on "Oldest"
                if ($(this).attr('id').toLowerCase() === "oldest") {
                    // if the current image's date is older/smaller than the date of the image comparing, swap them
                    if (currDateVal > cfDateVal) {
                        swapping(i, j);
                    }
                }
            }
        }

        for (let k = 0; k < galleryLen; k++) {
            // add the html text in order. Since the elements are already sorted by the date, adding the html text
            // in the order of the array will display the images by the date order as well
            let htmlText = String(imgNode[k]);
            $('#gallery').append(htmlText);
        }
        console.log("Image sorted!");
        console.log(imgDateArr);
        console.log(gallery.get(0).innerHTML);
    });

    $('body').on('show.bs.modal', function () {
        $('.sticky-top').css('margin-left', '-=0px');
    });

    $('body').on('hidden.bs.modal', function () {
        $('.sticky-top').css('margin-left', 'auto');
    });


});
//EOF Document.ready
