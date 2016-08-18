//获取表单必填字段的提示信息
function getFormRequiredInfo() {
    var msgRequired = $("#MsgRequired").val();
    return msgRequired;
}
//获取表单必填字段的提示信息
function getFormEmailInfo() {
    var msgEmail = $("#MsgEmail").val();
    return msgEmail;
}
//获取表单必填字段的提示信息
function getFormEqualToInfo() {
    var MsgEqualTo = $("#MsgEqualTo").val();
    return MsgEqualTo;
}

$(function () {

    // 电话号码验证 
    jQuery.validator.addMethod("phone", function (value, element) {
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
        var tel = /^\d{0,9}-?\d{0,9}$/;
        return this.optional(element) || (tel.test(value) || mobile.test(value));
    }, getFormEmailInfo());

    //验证邮箱  
    jQuery.validator.addMethod("checkEmail", function (value, element) {
        var myreg = /\w@\w*\.\w/;
        if (value != '') { if (!myreg.test(value)) { return false; } };
        if (value.indexOf('.') < 0) {
            return false;
        }
        return true;
    }, getFormEmailInfo());

});

(function ($, huawei) {
    huawei.Terminations =
    function () {
        $("#ExpungeQquery").on("submit", function (e) {
            if (!$(this).validate().form())
                return false;
            $.ajax({
                url: "http://www.huawei.com/iwcmcustom/getDimissionInfo?sysNumber=5824170",
                dataType: "jsonp",
                data: $("#ExpungeQquery").serialize(),
                jsonpCallback: "jsoncallback",
                success: function (result) {
                    if (result.success) {
                        $(".selectresult").prev("h2").empty().append("查询结果");
                        var date = result.issueTime;
                        date = date.substring(0, 10);
                        $(".selectresult").empty().append(date + "</br>" + result.description + "</br>若要了解具体情况，请联系BCGinquiries@huawei.com");
                    } else {
                        $(".selectresult").prev("h2").empty().append("查询结果");
                        $('.selectresult').empty().append("没有与您查询条件相匹配的信息。");
                    }
                }
            });
            return false;
        }).validate({
            ignore: [],
            onfocusout: function (element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            messages: {
                name: {
                    required: '<i class="icon_error"></i>' + $("#MsgRequired").attr("data-value")
                },
                certificateNum: {
                    required: '<i class="icon_error"></i>' + $("#MsgRequired").attr("data-value")
                }
            },
            rules: {
                name: {
                    required: true
                },
                certificateNum: {
                    required: true
                }
            },
            errorPlacement: function (label, element) {
                element.parents(".row").first().find(".field_message").empty().append(label);
            }
        });
        $(document).on("click", "#btnExpungeQquery", function () {
            $(this).parents("form").first().submit();
            return false;
        });
    }
})(jQuery, huawei);

(function ($, huawei) {
    huawei.NewsLetter =
    function () {
        $("#formNewsLetter").on("submit", function (e) {
            if (!$(this).validate().form())
                return false;
            return true;
        }).validate({
            ignore: [],
            onfocusout: function (element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            messages: {
                email: {
                    required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
                    email: '<i class="icon_error"></i>' + getFormEmailInfo()
                },
                country: {
                    required: '<i class="icon_error"></i>' + getFormRequiredInfo()
                }
            },
            rules: {
                email: {
                    required: true,
                    email: true
                },
                country: {
                    required: true
                }
            },
            errorPlacement: function (label, element) {
                element.parents(".row").first().find(".field_message").empty().append(label);
            }
        });
        $(document).on("click", "#btnNewsLetter", function () {
            $(this).parents("form").first().submit();
            return false;
        });
    }
})(jQuery, huawei);

(function ($, huawei) {
    huawei.PublicationsIndex =
    function () {
        $("form[class^='js_media_form']").each(function () {
            $(this).on("submit", function (e) {
                if (!$(this).validate().form())
                    return false;
                return true;
            }).validate({
                ignore: [],
                onfocusout: function (element) {
                    if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                        this.element(element);
                    }
                },
                messages: {
                    useremail: {
                        required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
                        email: '<i class="icon_error"></i>' + getFormEmailInfo()
                    },
                    username: {
                        required: '<i class="icon_error"></i>' + getFormRequiredInfo()
                    },
                    userComp: {
                        required: '<i class="icon_error"></i>' + getFormRequiredInfo()
                    },
                    userphoto: {
                        number: '<i class="icon_error"></i>' + getFormEmailInfo()
                    }
                },
                rules: {
                    useremail: {
                        required: true,
                        email: true
                    },
                    username: {
                        required: true
                    },
                    userComp: {
                        required: true
                    },
                    userphoto: {
                        number: true
                    }
                },
                errorPlacement: function (label, element) {
                    element.next("div").empty().append(label);
                }
            });
        });
        $(document).on("click", ".tijiao", function () {
            $(this).parents("form").submit();
            return false;
        });
    }
})(jQuery, huawei);
// bof
(function ($) {
    // bof dom ready
    $(function ($) {
        //表单验证方法调用
        huawei.registerForm();
        huawei.psirtForm();
        huawei.analystsregistartionForm();
        huawei.changePasswordForm();
        huawei.individuationForm();
        huawei.Terminations();
        huawei.NewsLetter();
        huawei.PublicationsIndex();
    });
    // eof dom ready
})(jQuery);
// eof

var huawei = huawei || {};

// 自定义复合选择框 custom.combobox bof
(function ($) {
    $.widget("custom.combobox", {
        _create: function () {
            this.wrapper = $("<span>")
				.addClass("custom-combobox")
				.insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
			value = selected.val() ? selected.text() : "";

            this.input = $("<input>")
				.appendTo(this.wrapper)
				.val(value)
				.attr("title", "")
                .attr("name", this.element.attr("id"))
				.attr("placeholder", this.element.attr("placeholder"))
				.addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
				.autocomplete({
				    delay: 0,
				    minLength: 0,
				    source: $.proxy(this, "_source")
				})
				.tooltip({
				    tooltipClass: "ui-state-highlight"
				});

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
			wasOpen = false;

            $("<a>")
			.attr("tabIndex", -1)
			.attr("title", "Show All Items")
			//			.tooltip()
			.appendTo(this.wrapper)
			.button({
			    icons: {
			        primary: "ui-icon-triangle-1-s"
			    },
			    text: false
			})
			.removeClass("ui-corner-all")
			.addClass("custom-combobox-toggle ui-corner-right")
			.mousedown(function () {
			    wasOpen = input.autocomplete("widget").is(":visible");
			})
			.click(function () {
			    input.focus();

			    // Close if already visible
			    if (wasOpen) {
			        return;
			    }

			    // Pass empty string as value to search for, displaying all results
			    input.autocomplete("search", "");
			});
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function (event, ui) {

            // Selected an item, nothing to do
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
			valueLowerCase = value.toLowerCase(),
			valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;
            }

            // Remove invalid value
            this.input
			.val("")
			.attr("title", value + " didn't match any item");
            //.tooltip("open");
            this.element.val("");
            this._delay(function () {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.data("ui-autocomplete").term = "";
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);
// eof

// 注册表单验证 bof
(function ($, huawei) {
    huawei.registerForm =
	function () {
	    $(".js_register_form")
		.on("submit", function (e) {
		    if (!$(this).validate().form())
		        return false;
		    $("#btnSubmitFeedback").attr("disabled", "disabled");
		    $(this).ajaxSubmit(function (data) {
		        //ajax请求成功
		        // $("#btnSubmitFeedback").removeAttr("disabled");
		        // var language = getLanguage() == "cn" ? "zh" : getLanguage();
		        // var path = "/" + language + "/success_result";
		        // window.location.href = path;
		        return false;
		    });

		    return false;
		})
		.validate({
		    ignore: [],
		    onfocusout: function (element, event) {
		        if (true || !this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
		            this.element(element);
		        }
		    },
		    messages: {
		        Gender: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Country: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Email2: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            equalTo: '<i class="icon_error"></i>' + getFormEqualToInfo()
		        },
		        Email: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            email: '<i class="icon_error"></i>' + getFormEmailInfo()
		        },
		        Biography: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Verify_Code: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        }
		    },
		    rules: {
		        Gender: {
		            required: true
		        },
		        Country: {
		            required: true
		        },
		        Email2: {
		            required: true,
		            equalTo: "input[name='Email']"
		        },
		        Email: {
		            required: true,
		            email: true
		        },
		        Biography: {
		            required: true
		        },
		        Verify_Code: {
		            required: true
		        }
		    },
		    errorPlacement: function (label, element) {
		        //console.log(arguments);
		        element.parents(".row").first().find(".field_message").empty().append(label);
		    }
		});

	    $(document).on("click", ".js_register_form_submit", function (e) {
	        $(this).parents("form").first().submit();
	        return false;
	    })
		.on("focusout", ".custom-combobox input", function (e) {
		    $(this).parent().prev("select").change();
		    return true;
		})
		.on("change", ".js_combobox", function (e) {
		    setTimeout(function () {
		        $(e.target).valid();
		    }, 500);

		    return true;
		})
		.on("click", ".js_checkable", function (e) {
		    if ($(e.target).is("input"))
		        return true;
		    $(this).find("input").trigger("click");
		});

	    // combobox setup
	    $(".js_combobox").combobox({
	        select: function (event, ui) {
	            $(ui.item.parentNode).change();

	        }
	    });

	};

})(jQuery, huawei);
// eof

// 更改密码表单验证 bof
(function ($, huawei) {
    huawei.changePasswordForm =
	function () {
	    $(".js_change_password_form")
		.on("submit", function (e) {
		    if (!$(this).validate().form())
		        return false;
		    $("#btnSubmitFeedback").attr("disabled", "disabled");
		    $(this).ajaxSubmit(function (data) {
		        //ajax请求成功
		        // $("#btnSubmitFeedback").removeAttr("disabled");
		        // var language = getLanguage() == "cn" ? "zh" : getLanguage();
		        // var path = "/" + language + "/success_result";
		        // window.location.href = path;
		        return false;
		    });

		    return false;
		})
		.validate({
		    ignore: [],
		    onfocusout: function (element, event) {
		        if (true || !this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
		            this.element(element);
		        }
		    },
		    messages: {
		        Email: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            email: '<i class="icon_error"></i>' + getFormEmailInfo()
		        },
		        Password: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Newpassword: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Confirm_password: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            equalTo: '<i class="icon_error"></i>' + getFormEqualToInfo()
		        }
		    },
		    rules: {
		        Email: {
		            required: true,
		            email: true
		        },
		        Password: {
		            required: true
		        },
		        Newpassword: {
		            required: true
		        },
		        Confirm_password: {
		            required: true,
		            equalTo: "input[name='Newpassword']"
		        }
		    },
		    errorPlacement: function (label, element) {
		        //console.log(arguments);
		        element.parents(".row").first().find(".field_message").empty().append(label);
		    }
		});

	    $(document).on("click", ".js_change_password_form_submit", function (e) {
	        $(this).parents("form").first().submit();
	        return false;
	    });

	};
})(jQuery, huawei);
// eof

// 角色验证表单验证 bof
(function ($, huawei) {
    huawei.individuationForm =
	function () {
	    var validateOptions = {
	        ignore: [],
	        onfocusout: function (element, event) {
	            if (true || !this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
	                this.element(element);
	            }
	        },
	        messages: {
	            username: {
	                required: '<i class="icon_error"></i>' + getFormRequiredInfo()
	            },
	            organization: {
	                required: '<i class="icon_error"></i>' + getFormRequiredInfo()
	            }
	        },
	        rules: {
	            username: {
	                required: true
	            },
	            organization: {
	                required: true
	            }
	        },
	        errorPlacement: function (label, element) {
	            //console.log(arguments);
	            element.next(".field_message").empty().append(label);
	        }
	    };
	    $(".js_individuation_form,.js_abalysts_form,.js_media_form")
		.on("submit", function (e) {
		    if (!$(this).validate().form())
		        return false;
		    $("#btnSubmitFeedback").attr("disabled", "disabled");
		    $(this).ajaxSubmit(function (data) {
		        //ajax请求成功
		        // $("#btnSubmitFeedback").removeAttr("disabled");
		        // var language = getLanguage() == "cn" ? "zh" : getLanguage();
		        // var path = "/" + language + "/success_result";
		        // window.location.href = path;
		        return false;
		    });

		    return false;
		}).each(function (i, o) {
		    $(this).validate(validateOptions);
		});

	    $(document).on("click", ".tijiao", function (e) {
	        $(this).parents("form").first().submit();
	        return false;
	    });

	};
})(jQuery, huawei);
// eof

// psirt 订阅表单验证 bof
(function ($, huawei) {
    huawei.psirtForm =
	function () {
	    $(".js_psirt_form")
		.on("submit", function (e) {
		    if (!$(this).validate().form())
		        return false;
		    //$("#btnSubmitFeedback").attr("disabled", "disabled");
		    //$(this).ajaxSubmit(function (data) {
		    //    //ajax请求成功
		    //    // $("#btnSubmitFeedback").removeAttr("disabled");
		    //    // var language = getLanguage() == "cn" ? "zh" : getLanguage();
		    //    // var path = "/" + language + "/success_result";
		    //    // window.location.href = path;
		    //    return false;
		    //});

		    //return false;
		})
		.validate({
		    ignore: [],
		    onfocusout: function (element, event) {
		        if (true || !this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
		            this.element(element);
		        }
		    },
		    messages: {
		        country: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        email: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            checkEmail: '<i class="icon_error"></i>' + getFormEmailInfo()
		        },
		        tel: {
		            phone: '<i class="icon_error"></i>' + getFormEmailInfo()
		        }
		    },
		    rules: {
		        country: {
		            required: true
		        },
		        email: {
		            required: true,
		            checkEmail: true
		        },
		        tel: {
		            phone: true
		        }
		    },
		    errorPlacement: function (label, element) {
		        //console.log(arguments);
		        element.parents(".row").first().find(".field_message").empty().append(label);
		    }
		});

	    $(document).on("click", ".js_psirt_form_submit", function (e) {
	        $(this).parents("form").first().submit();
	        return false;
	    })
		.on("focusout", ".custom-combobox input", function (e) {
		    $(this).parent().prev("select").change();
		    return true;
		})
		.on("change", ".js_combobox", function (e) {
		    setTimeout(function () {
		        $(e.target).valid();
		    }, 500);

		    return true;
		})
		.on("click", ".js_checkable", function (e) {
		    if ($(e.target).is("input"))
		        return true;
		    $(this).find("input").trigger("click");
		});

	    // combobox setup
	    $(".js_combobox").combobox({
	        select: function (event, ui) {
	            $(ui.item.parentNode).change();

	        }
	    });

	};

})(jQuery, huawei);
// eof

//权限认证
(function ($, huawei) {
    huawei.myhuawei = function () {
        $("#frSendRole").ajaxSubmit(function (data) {
            return false;
        });
    }
})(jQuery, huawei);

// 行业分析师注册 bof
(function ($, huawei) {
    huawei.analystsregistartionForm =
	function () {
	    $(".js_analystsregistartion_form")
		.on("submit", function (e) {
		    if (!$(this).validate().form())
		        return false;
		    if (!$("input[name='Agree']").prop("checked")) {
		        return false;
		    }
		    //$("#btnSubmitFeedback").attr("disabled", "disabled");
		    //$(this).ajaxSubmit(function (data) {
		    //    //ajax请求成功
		    //    // $("#btnSubmitFeedback").removeAttr("disabled");
		    //    // var language = getLanguage() == "cn" ? "zh" : getLanguage();
		    //    // var path = "/" + language + "/success_result";
		    //    // window.location.href = path;
		    //    return false;
		    //});

		    //return false;
		})
		.validate({
		    ignore: [],
		    onfocusout: function (element, event) {
		        if (true || !this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
		            this.element(element);
		        }
		    },
		    messages: {
		        ConfirmEmail: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            checkEmail:'<i class="icon_error"></i>' + getFormEmailInfo(),
		            equalTo: '<i class="icon_error"></i>' + getFormEqualToInfo()
		        },
		        Email: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            checkEmail: '<i class="icon_error"></i>' + getFormEmailInfo()
		        },
		        Gender: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        GivenName: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        LastName: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Company: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        JobTitle: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Department: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Mobile: {
		            phone: '<i class="icon_error"></i>' + getFormEmailInfo()
		        },
		        Deskphone: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo(),
		            phone: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Country: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        City: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Address: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        Biography: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        //Attachment: {
		        //    required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        //},
		        Agree: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        },
		        VerifyCode: {
		            required: '<i class="icon_error"></i>' + getFormRequiredInfo()
		        }
		    },
		    rules: {
		        ConfirmEmail: {
		            required: true,
		            checkEmail: true,
		            equalTo: "input[name='Email']"
		        },
		        Email: {
		            required: true,
		            checkEmail: true
		        },
		        Gender: {
		            required: true
		        },
		        GivenName: {
		            required: true
		        },
		        LastName: {
		            required: true
		        },
		        Company: {
		            required: true
		        },
		        JobTitle: {
		            required: true
		        },
		        Department: {
		            required: true
		        },
		        Mobile: {
		            phone: true
		        },
		        Deskphone: {
		            required: true,
		            phone: true
		        },
		        Country: {
		            required: true
		        },
		        City: {
		            required: true
		        },
		        Address: {
		            required: true
		        },
		        Biography: {
		            required: true
		        },
		        //Attachment: {
		        //    required: true
		        //},
		        Agree: {
		            required: true
		        },
		        VerifyCode: {
		            required: true
		        }
		    },
		    errorPlacement: function (label, element) {
		        //console.log(arguments);
		        element.parents(".row").first().find(".field_message").empty().append(label);
		    }
		});

	    $(document).on("click", ".js_analystsregistartion_form_submit", function (e) {
	        $(this).parents("form").first().submit();
	        return false;
	    })
		.on("focusout", ".custom-combobox input", function (e) {
		    $(this).parent().prev("select").change();
		    return true;
		})
		.on("change", ".js_combobox", function (e) {
		    setTimeout(function () {
		        $(e.target).valid();
		    }, 500);

		    return true;
		})
		.on("click", ".js_checkable", function (e) {
		    if ($(e.target).is("input"))
		        return true;
		    $(this).find("input").trigger("click");
		});

	    // combobox setup
	    $(".js_combobox").combobox({
	        select: function (event, ui) {
	            $(ui.item.parentNode).change();

	        }
	    });

	};

})(jQuery, huawei);
// eof

