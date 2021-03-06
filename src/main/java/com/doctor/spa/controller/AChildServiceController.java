package com.doctor.spa.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.doctor.spa.common.response.ResponseBody;
import com.doctor.spa.dto.ChildServiceDto;
import com.doctor.spa.service.ChildSerService;
import com.doctor.spa.service.ServiceGroupService;
import com.doctor.spa.util.Pages;

@Controller
@RequestMapping(value = "/admin")
public class AChildServiceController {
	
	@Autowired
	ServiceGroupService serService;
	
	@Autowired
	ChildSerService childService;

	@RequestMapping(value="/service-list", method=RequestMethod.GET)
	public String goToList() {	
		return Pages.A_SERVICE_LIST;
	}
	
	@RequestMapping(value="/service-edit/{id}", method=RequestMethod.GET)
	public String goToEdit() {	
		return Pages.A_SERVICE_EDIT;
	}
	
	@GetMapping(value="/service-list/no")
	public ResponseEntity<ResponseBody<Integer>> getChildServiceNo(@RequestParam Long groupId) {
		return ResponseEntity.ok(new ResponseBody<>(HttpStatus.OK, childService.getServiceNo(groupId)));
	}
	
	@GetMapping(value="/service-list/all")
	public ResponseEntity<ResponseBody<Page<ChildServiceDto>>> getChildServices(@RequestParam Long groupId, Pageable pageable) {
		return ResponseEntity.ok(new ResponseBody<>(HttpStatus.OK, childService.getChildServiceByGroupId(groupId, pageable)));
	}
	
	@DeleteMapping(value = "/service-delete/{id}")
	public ResponseEntity<ResponseBody<Boolean>> deleteService(@PathVariable long id) {	
		return ResponseEntity.ok(new ResponseBody<>(HttpStatus.OK, childService.deleteService(id)));
	}
	
	@RequestMapping(value="/service-add", method=RequestMethod.GET)
	public String goToAddPage() {	
		return Pages.A_SERVICE_ADD;
	}
	
	@PostMapping(value = "/service-create")
	public ResponseEntity<ResponseBody<Boolean>> createService(@RequestBody ChildServiceDto dto) {	
		return ResponseEntity.ok(new ResponseBody<>(HttpStatus.OK, childService.createService(dto)));
	}
	
	@GetMapping(value = "/service-validate/url/noid")
	public ResponseEntity<Map<String, Boolean>> checkUrlNoId(@RequestParam String url) {
		return ResponseEntity.ok(childService.validateUrlNoId(url));
	}
	
	@GetMapping(value = "/service-validate/url")
	public ResponseEntity<Map<String, Boolean>> checkUrl(@RequestParam String url, @RequestParam Long id) {
		return ResponseEntity.ok(childService.validateUrl(url, id));
	}
	
	@GetMapping(value = "/service/child/{id}")
	public ResponseEntity<ResponseBody<ChildServiceDto>> getChildService(@PathVariable long id) {
		return ResponseEntity.ok(new ResponseBody<>(HttpStatus.OK, childService.getChildServiceById(id)));
	}
	
	@PostMapping(value = "/service-update")
	public ResponseEntity<ResponseBody<Boolean>> updateService(@RequestBody ChildServiceDto dto) {	
		return ResponseEntity.ok(new ResponseBody<>(HttpStatus.OK, childService.updateService(dto)));
	}
}
