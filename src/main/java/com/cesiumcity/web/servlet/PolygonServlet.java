package com.cesiumcity.web.servlet;

import com.alibaba.fastjson.JSON;
import com.cesiumcity.pojo.Polygon;
import com.cesiumcity.pojo.PageBean;
import com.cesiumcity.service.PolygonService;
import com.cesiumcity.service.impl.PolygonServiceImpl;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "PolygonServlet", value = "/polygon/*")
public class PolygonServlet extends BaseServlet {
    private PolygonService polygonService = new PolygonServiceImpl();

    public void selectAll(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 调用service查询
        List<Polygon> polygons = polygonService.selectAll();
        // 转换为JSON
        String jsonString = JSON.toJSONString(polygons);
        // 写数据
        response.setContentType("text/json;charset=utf-8");
        response.getWriter().write(jsonString);
    }

    public void add(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 接收要素数据
        BufferedReader br = request.getReader();
        String params = br.readLine();
        // 转换为Polygon对象
        Polygon polygon = JSON.parseObject(params, Polygon.class);
        // 调用service添加
        polygonService.add(polygon);
        // 响应成功信息
        response.getWriter().write("success");
    }

    public void deleteByIds(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 接收数据
        BufferedReader br = request.getReader();
        String params = br.readLine();
        // 转换为数组
        int[] ids = JSON.parseObject(params, int[].class);
        // 调用service删除
        polygonService.deleteByIds(ids);
        // 响应成功信息
        response.getWriter().write("success");
    }

    public void selectByPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 接收页码和条数 url?xxx=xxx&xxx=xxx
        String _currentPage = request.getParameter("currentPage");
        String _pageSize = request.getParameter("pageSize");
        int currentPage = Integer.parseInt(_currentPage);
        int pageSize = Integer.parseInt(_pageSize);
        // 调用service查询
        PageBean<Polygon> polygonPageBean = polygonService.selectByPage(currentPage, pageSize);
        // 转换为JSON
        String jsonString = JSON.toJSONString(polygonPageBean);
        // 返回数据
        response.setContentType("text/json;charset=utf-8");
        response.getWriter().write(jsonString);
    }

    public void selectByPageAndCondition(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 接收页码和条数 url?xxx=xxx&xxx=xxx
        String _currentPage = request.getParameter("currentPage");
        String _pageSize = request.getParameter("pageSize");
        int currentPage = Integer.parseInt(_currentPage);
        int pageSize = Integer.parseInt(_pageSize);
        // 读入条件
        BufferedReader br = request.getReader();
        String params = br.readLine();
        Polygon polygon = JSON.parseObject(params, Polygon.class);
        // 调用service查询
        PageBean<Polygon> polygonPageBean = polygonService.selectByPageAndCondition(currentPage, pageSize, polygon);
        // 转换为JSON
        String jsonString = JSON.toJSONString(polygonPageBean);
        // 返回数据
        response.setContentType("text/json;charset=utf-8");
        response.getWriter().write(jsonString);
    }
}
