/*
package com.cesiumcity.web.servlet.old;


import com.alibaba.fastjson.JSON;
import com.cesiumcity.pojo.Brand;
import com.cesiumcity.service.BrandService;
import com.cesiumcity.service.impl.BrandServiceImpl;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.List;

//@WebServlet(name = "SelectAllServlet", value = "/selectAllServlet")
public class SelectAllServlet extends HttpServlet {

    private BrandService brandService = new BrandServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 调用service查询
        List<Brand> brands = brandService.selectAll();
        // 转为JSON
        String jsonString = JSON.toJSONString(brands);
        // 写数据
        response.setContentType("text/json;charset=utf-8");
        response.getWriter().write(jsonString);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}*/
