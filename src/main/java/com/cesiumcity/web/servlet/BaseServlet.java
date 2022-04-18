package com.cesiumcity.web.servlet;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 替换HttpServlet，根据请求的最后一段路径进行方法分发
 */

@WebServlet(name = "BaseServlet", value = "/BaseServlet")
public class BaseServlet extends HttpServlet {

    // 根据资源路径分发
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) {
        // 获取请求路径 /CesiumCity/brand/selectAll
        String uri = req.getRequestURI();
        // 获取分发路径
        int index = uri.lastIndexOf('/');
        String methodName = uri.substring(index + 1);
        // 获取字节码对象
        Class<? extends BaseServlet> cls = this.getClass();
        // 获取method对象(反射)
        try {
            Method method = cls.getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
            // 执行方法
            method.invoke(this,req, resp);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
