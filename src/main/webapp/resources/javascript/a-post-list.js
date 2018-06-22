$(document).ready(function() {
	//KoSelectHandler();
	var newsModel = new News();
	ko.applyBindings(newsModel);
	newsModel.getServiceGroups();
	newsModel.getPageNo(0, '').done(function (res) {	
		// Initialize pagination
		newsModel.initPagination();
	});
	newsModel.initSearch();
})

function News() {
	var self = this;
	var pageSize = 5;
	
	// Url
	var rootContext = $('#root-context').val();
	var getPostsUrl = rootContext + '/admin/news-list/all'
	var goToEditUrl = rootContext + '/admin/news-edit/';
	var returnNewsList = rootContext + '/admin/news-list';
	var goToCreateUrl = rootContext + '/admin/news-add';
	var deleteUrl = rootContext + '/admin/news-delete/';
	var loadServiceGroupsUrl = rootContext + '/admin/service-group-list/all';
	var getPageNoUrl = rootContext + '/admin/news-list/no';
	
	// Message
	var deleteSuccess = 'Xoá thành công';
	var deleteFail = 'Không thể xoá';
	var deleteRemind = 'Bạn đã xoá tất cả dịch vụ con chưa?';
	var deleteConfirm = 'Bạn muốn xoá tin này?';
	var agree = 'Đồng ý';
	var cancel = 'Không';
		
	// Observable
	self.groupId = ko.observable();
	self.searchText = ko.observable('');
	self.newsPosts = ko.observableArray([]);
	self.serviceGroups = ko.observableArray([]);
	
	var pageOptions = {
			totalPages: 1,
			visiblePages: 3,
			startPage: 1,
			first: 'Trang đầu',
			last: 'Trang cuối',
			prev: 'Trang trước',
			next: 'Trang sau',
			onPageClick : function(event, page) {
				// get group id
				self.loadNews(page - 1, pageSize, 'asc', self.groupId(), self.searchText());
			}
		}
	
	self.groupId.subscribe(function() {
		
		// Destroy old pagination
		$('#pagination-post').twbsPagination('destroy');
		self.newsPosts([]);
		
		// get service group quantity
		self.getPageNo(self.groupId(), self.searchText()).done(function (res) {
			// Initialize pagination
			self.initPagination();
		});
	});
	
	self.initSearch = function() {
		$('#search-btn').on('click', function() {
			$('#pagination-post').twbsPagination('destroy');
			self.newsPosts([]);
			
			// get service group quantity
			self.getPageNo(self.groupId(), self.searchText()).done(function (res) {
				// Initialize pagination
				self.initPagination();
			});
		});
	}
	
	self.getServiceGroups = function() {
		$.ajax({
			type : "GET",
			url : loadServiceGroupsUrl,
			success : function(res) {
				if (res.code == 200) {
					self.serviceGroups(res.data);
				}
			}, error: function(e) {
				console.log(e);
			}
		})
	}
	
	self.getPageNo = function(groupId, searchText) {
		var query = {
			groupId: groupId,
			searchText: searchText
		}
		return $.ajax({
			type : "GET",
			data: query,
			url : getPageNoUrl,
			success : function(res) {
				console.log(res);
				var totalService = res.data;
				pageOptions.totalPages = Math.ceil(totalService / pageSize);
			}
		});
	}
	
	self.loadNews = function(pageNo, pageSize, pageSort, groupId, searchText) {
		var that = this;
		var pageable = {
			page : pageNo,
			size : pageSize,
			sort : pageSort,
			groupId: groupId,
			searchText: searchText
		}
		$.ajax({
			type : "GET",
			url : getPostsUrl,
			dataType : 'json',
			data : pageable,
			success : function(res) {		
				console.log(res);
				self.newsPosts(res.data.content);
			}
		});
	}
	
	self.initPagination = function() {
		if (pageOptions.totalPages > 0) {
			$('#pagination-post').twbsPagination(pageOptions);
		}
	}
	
	self.showImage = function(data) {
    	swal({
		  imageUrl: 'data:image/png;base64,' + data.image,
		  imageHeight: 250,
		  imageAlt: 'service name'
		});
    }
    
    self.deletePost = function(data) {
    	var url = deleteUrl + data.id;
    	swal({
    		  	text: "Bạn muốn xoá tin này?",
    		  	type: 'warning',
    		  	showCancelButton: true,
    		  	confirmButtonText: agree,
    		  	cancelButtonText: cancel,
    		}).then((result) => {
    			if (result.value) {
    				$.ajax({
    		    	    type: 'DELETE',
    		    	    url: url,
    		    	    success: function(msg) {
    		    	        if (msg.code === 200) {
    		    	        	if (msg.data === true) {
    		    	        		swal({
    			        			  type: 'success',
    			        			  text: deleteSuccess,
    			        			  onClose: function() {
    			        				  window.location.href = returnNewsList;
    			        			  }
    			        			});
    		    	        	} else {
    		    	        		swal({
    		  	        			  type: 'error',
    		  	        			  text: deleteFail,
    		  	        			  footer: deleteRemind,
    		  	        			});
    		    	        	}
    		    	        }
    		    	    },
    		    	    error: function(e) {
    		    	    	console.log(e);
    		    	    	if (e.status === 901) {
    		    	    		swal({
    			        			  type: 'info',
    			        			  text: 'Hết phiên làm việc, vui lòng đăng nhập lại',
    			        			  onClose: function() {
    			        				  window.location.href = 'admin/login';
    			        			  }
    			        		});
    		    	    	}
    		    	    }
    		    	});
    			}
    		});
    };
    
    self.goToEdit = function(data) {
    	var getUrl = goToEditUrl + data.id;
    	window.location.href = getUrl;
    }
    
    self.goToCreate = function(data) {
    	window.location.href = goToCreateUrl;
    }
}