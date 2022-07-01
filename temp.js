class FormTemporary{

	constructor(selector){
		this.selector = selector
		this.element = document.querySelector(selector)
		this.url = window.location.href
		this.field_items = [
						"text",
						"date",
						"time",
						"range",
						"number",
						"email",
						"password",
						"select",
						"radio",
						"checkbox",
						"textarea"
					 ]
		this.delay = true
		this.delayDuration = 1000
	}

	record(options){
		if(options){
			if(typeof options.allows !== 'undefined'){
				this.setAllows(options.allows)
			}
			if(typeof options.ignore !== 'undefined'){
				this.setIgnore(options.ignore)
			}
			if(typeof options.delay !== 'undefined'){
				this.delay = options.delay
			}
			if(typeof options.delayDuration !== 'undefined'){
				this.delayDuration = options.delayDuration
			}
		}
		var that = this
		this.setTemporary()
		this.startRecord()
		this.makeLocalStorage()
		this.element.onsubmit = function(){
			window.onbeforeunload = function(){
				that.clear()
			}
		}
	}


	setAllows(allow)
	{
		var field_items = this.field_items
		for(var i=0;i<allow.length;i++)
		{
			if(!field_items.includes(allow[i])){
				field_items.push(allow[i])
			}
		}
		this.field_items = field_items
	}

	setIgnore(ignore)
	{
		var field_items = this.field_items
		for(var i=0;i<ignore.length;i++)
		{
			if(field_items.includes(ignore[i])){
				var index = field_items.indexOf(ignore[i])
				field_items.splice(index,1)
			}
		}
		this.field_items = field_items
	}

	makeLocalStorage()
	{
		var local = localStorage.getItem('save-temporary')
		var that = this
		if(!local)
		{
			var local = [{
				url : this.url,
				selector : this.selector,
				values : []
			}]
		}else{
			local = JSON.parse(local)
			var exists = false
			local.forEach(function(item,index){
				if(item.url == that.url && item.selector == that.selector){
					exists = true
				}
			})
			if(!exists){
				local.push({
					url : this.url,
					selector : this.selector,
					values : []
				})
			}
		}
		localStorage.setItem('save-temporary',JSON.stringify(local))
	}

	setTemporary()
	{
		var element = this.element
		var local = localStorage.getItem('save-temporary')
		var json = JSON.parse(local)
		var that = this
		var temp = []
		if(!json){
			return
		}
		json.forEach(function(item,index){
			if(item.url == that.url  && item.selector == that.selector){
				temp = item.values
			}
		})
		this.temporary = temp

		temp.forEach(function(item,index){
			var input = ['text','number','email','password','date','time','range']
			if(input.includes(item.type)){
				if(Array.isArray(item.value)){
					var multipleInput = element.querySelectorAll("*[type='"+item.type+"'][name='"+item.name+"']")
					multipleInput.forEach(function(i,d){
						if(that.delay){
							i.value = "..."
							setTimeout(function(){
								i.value = item.value[d]
							},that.delayDuration)
						}else{
							i.value = item.value[d]
						}
					})
				}else{
					var input = element.querySelectorAll("*[type='"+item.type+"'][name='"+item.name+"']")
					input.forEach(function(i,d){
						if(that.delay){
							i.value = "..."
							setTimeout(function(){
								i.value = item.value
							},that.delayDuration)
						}else{
							i.value = item.value
						}
					})
				}
			}
			if(item.type == 'radio'){
				if(that.delay){
					setTimeout(function(){
						element.querySelector("*[type='"+item.type+"'][name='"+item.name+"'][value='"+item.value+"']").setAttribute('checked','checked')
					},that.delayDuration)
				}else{
					element.querySelector("*[type='"+item.type+"'][name='"+item.name+"'][value='"+item.value+"']").setAttribute('checked','checked')
				}
			}
			if(item.type == 'checkbox'){
				if(Array.isArray(item.value)){
					item.value.forEach(function(i,d){
						if(that.delay){
							setTimeout(function(){
								element.querySelector("*[type='"+item.type+"'][name='"+item.name+"'][value='"+i+"']").setAttribute('checked','checked')
							},that.delayDuration)
						}else{
							element.querySelector("*[type='"+item.type+"'][name='"+item.name+"'][value='"+i+"']").setAttribute('checked','checked')
						}
					})
				}else{
					var checkbox = element.querySelectorAll("*[type='"+item.type+"'][name='"+item.name+"'][value='"+item.value+"']")
					checkbox.forEach(function(i,d){
						if(that.delay){
							setTimeout(function(){
								i.setAttribute('checked','checked')
							},that.delayDuration)
						}else{
							i.setAttribute('checked','checked')
						}
					})
				}
			}
			if(item.type == 'textarea'){
				if(Array.isArray(item.value)){
					var multipleInput = element.querySelectorAll("textarea[name='"+item.name+"']")
					multipleInput.forEach(function(i,d){
						if(that.delay){
							i.value = "..."
							setTimeout(function(){
								i.value = item.value[d]
							},that.delayDuration)
						}else{
							i.value = item.value[d]
						}
					})
				}else{
					var input = element.querySelectorAll("textarea[name='"+item.name+"']")
					input.forEach(function(i,d){
						if(that.delay){
							i.value = "..."
							setTimeout(function(){
								i.value = item.value
							},that.delayDuration)
						}else{
							i.value = item.value
						}
					})
				}
			}
			if(item.type == 'select'){
				if(Array.isArray(item.value)){
					var multiSelect = element.querySelectorAll("select[name='"+item.name+"']")
					multiSelect.forEach(function(select,d){
						if(that.delay){
							setTimeout(function(){
								for(var option of select.options){
									if(item.value.includes(option.value)){
										option.setAttribute('selected','selected')
									}
					   			}
								select.dispatchEvent(new Event('change'));
							},that.delayDuration)
						}else{
							for(var option of select.options){
								if(item.value.includes(option.value)){
									option.setAttribute('selected','selected')
								}
				   			}
							select.dispatchEvent(new Event('change'));
						}
					})
				}else{
					var select = element.querySelectorAll("select[name='"+item.name+"']")
					select.forEach(function(i,d){
						if(that.delay){
							setTimeout(function(){
								i.value = item.value
								i.dispatchEvent(new Event('change'));
							},that.delayDuration)
						}else{
							i.value = item.value
							i.dispatchEvent(new Event('change'));
						}
					})
				}
			}
		})
	}

	getTemporary()
	{
		return this.temporary
	}

	clear()
	{
		var local = localStorage.getItem('save-temporary')
		var json = JSON.parse(local)
		var that = this

		json.forEach(function(item,index){
			if(item.url == that.url && item.selector == that.selector){
				json[index].values = []
			}
		})
		localStorage.setItem('save-temporary',JSON.stringify(json))
	}

	startRecord()
	{
		var element = this.element
		var that = this
		this.field_items.forEach(function(item,index){
			// input element
			var input = ['text','number','email','password','radio','checkbox','date','time','range']
			if(input.includes(item)){
				var inputElemet = element.querySelectorAll("*[type='"+item+"']")
				if(inputElemet.length > 0){
					inputElemet.forEach(function(selector,index){
						selector.addEventListener('change', (event) => {
						   var name = event.target.getAttribute('name')
						   if(name.includes('[')){
						   		var value = []
						   		if(item == 'checkbox'){
						   			var multipleInput = element.querySelectorAll("*[type='"+item+"'][name='"+name+"']:checked")
						   		}else{
						   			var multipleInput = element.querySelectorAll("*[type='"+item+"'][name='"+name+"']")
						   		}
						   		multipleInput.forEach(function(i,d){
						   			value.push(i.value)
						   		})
						   }else{
						   		var value = event.target.value
						   }
						   if(item && name){
						   		that.saveRecord(item,name,value)
						    }
						})
					})
				}
			}

			// select option
			if(item == 'select'){
				var selectOption = element.querySelectorAll("select")
				if(selectOption.length > 0){
					selectOption.forEach(function(selector,index){
						selector.addEventListener('change', (event) => {
						   var name = event.target.getAttribute('name')
						   if(name.includes('[')){
						   		var value = []
						   		var multipleSelector = element.querySelectorAll("select[name='"+name+"']")
						   		multipleSelector.forEach(function(select,d){
						   			for(var option of select.options){
						   				if(option.selected){
						   					value.push(option.value);
						   				}
						   			}
						   		})
						   }else{
						   		var value = event.target.value
						   }
							if(name){
						   		that.saveRecord('select',name,value)
							}
						})
					})
				}
			}

			//textarea
			if(item == 'textarea'){
				var textarea = element.querySelectorAll("textarea")
				if(textarea.length > 0){
					textarea.forEach(function(text,index){
						text.addEventListener('change',(event) => {
							var name = event.target.getAttribute('name')
							if(name.includes('[')){
								var value = []
								var multipleTextarea = element.querySelectorAll("textarea[name='"+name+"']")
								multipleTextarea.forEach(function(i,d){
									value.push(i.value)
								})
							}else{
								var value = event.target.value
							}
							if(name){
								that.saveRecord('textarea',name,value)
							}
						})
					})
				}
			}
		})
	}

	saveRecord(type,name,value)
	{
		var local = localStorage.getItem('save-temporary')
		var json = JSON.parse(local)
		var that = this

		json.forEach(function(item,index){
			if(item.url == that.url && item.selector == that.selector){
				var values = json[index].values
				var value_index = -1
				values.forEach(function(i,d){
					if(i.name == name && i.type == type){
						value_index = d
					}
				})
				if(value_index > -1){
					json[index].values[value_index] = {
						type : type,
						name : name,
						value : value
					}
				}else{
					json[index].values.push({
						type : type,
						name : name,
						value : value
					})
				}
			}
		})
		localStorage.setItem('save-temporary',JSON.stringify(json))
	}
}