/*
package com.cesiumcity.web.servlet.old;

import com.alibaba.fastjson.JSON;
import com.cesiumcity.pojo.Brand;
import com.cesiumcity.service.BrandService;
import com.cesiumcity.service.impl.BrandServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

//@WebServlet(name = "AddServlet", value = "/addServlet")
public class AddServlet extends HttpServlet {

    private BrandService brandService = new BrandServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 接收品牌数据
        BufferedReader br = request.getReader();
        String params = br.readLine();

        // 转换为Brand对象
        Brand brand = JSON.parseObject(params, Brand.class);

        // 调用service添加
        brandService.add(brand);

        // 响应成功标识
        response.getWriter().write("success");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}*/
