<!DOCTYPE html>
<html lang="en">

<head>
    <#include "a-headerinc.html.ftl">
    <link rel="stylesheet" type="text/css" href="<@spring.url '/resources/css/a-picture-list.css'/>"/>
    <script src="<@spring.url '/resources/javascript/a-picture-list.js'/>"></script>
</head>

<body>
	<input type="hidden" id="root-context" value="${rootContext.getContextPath()}"></input>
    <div class="wrapper">
        <#include "a-nav-left.html.ftl">
        <div class="main-panel">
            <nav class="navbar navbar-transparent navbar-absolute">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#"> Hình tiêu đề trang chủ </a>
                    </div>
                </div>
            </nav>
            <div class="content">
                <div class="container-fluid">
                    <div class="row">              
                        <div class="col-lg-12 col-md-12">
                            <div class="card">
                                <div class="card-header" data-background-color="green">
                                	<div class="row"> 
	                                	<div class="col-lg-6 col-md-6">
	                                    	<h4 class="title">Danh sách</h4>
	                                    </div>
	                                </div>
                                </div>
                                <div class="card-content table-responsive">
                                	<div class="row">              
                        				<div class="col-lg-12 col-md-12">
                        				
                        					<table class="table table-hover">
		                                        <thead>
		                                            <th class="text-center">Số thứ tự</th>
		                                            <th class="text-center">Hiển thị trên trang chủ</th>
		                                            <th class="text-center">Xem hình</th>
		                                            <th class="text-center">Chọn hình</th>
		                                        </thead>
		                                        <tbody data-bind="foreach: images">
		                                            <tr>
		                                                <td class="text-center" data-bind="text: $index() + 1">1</td>
		                                                <td class="text-center">
		                                                	<input type="checkbox" data-bind="checked: $parent['isShownHome' + $index()]">
		                                                </td>
		                                                <td class="text-center show-image" data-bind="click: $parent.showImage.bind($data, $index())">
		                                                	<i class="fa fa-image"></i>
		                                                </td>
		                                                <td class="text-center">
		                                                	<div class="form-inline">											    	
														    	<label class="custom-image-upload form-control">
																    <i class="fa fa-cloud-upload"></i> Upload hình
																</label>
																<input name="image" type="file" class="form-control image-inp" data-bind="attr: { 'data-image': $index() }" id="image-inp0" accept="image/*">
																<input required type="hidden" data-bind="value: $parent['base64Field' + $index()]"/>							
													  		</div>
		                                                </td>
		                                            </tr>
		                                        </tbody>
		                                    </table>
		                                </div>
                                    </div>
                                    
                                    <div class="row">              
                        				<div class="col-lg-4 col-md-12 col-xs-12">
		                                    <button class="btn btn-info pull-left" data-bind="click: save"><span><i class="fa fa-plus"></i>&nbsp;&nbsp;</span>Lưu</button>   
                                    	</div>                 	
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>