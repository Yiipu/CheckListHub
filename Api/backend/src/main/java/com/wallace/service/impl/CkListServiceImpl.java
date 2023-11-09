package com.wallace.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.mapper.ProgressMapper;
import com.wallace.pojo.CkList;
import com.wallace.pojo.Progress;
import com.wallace.pojo.VO.CkListView;
import com.wallace.service.CkListService;
import com.wallace.mapper.CkListMapper;
import com.wallace.utils.JsonTypeHandler;
import com.wallace.utils.Result;
import com.wallace.utils.ResultCodeEnum;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * @author y1693
 * @description 针对表【ck_list】的数据库操作Service实现
 * @createDate 2023-11-03 14:03:34
 */
@Service
public class CkListServiceImpl extends ServiceImpl<CkListMapper, CkList>
        implements CkListService {
    String[] returnEmpty = new String[0];
    @Resource
    private CkListMapper ckListMapper;

    @Resource
    private ProgressMapper progressMapper;

    /*
     * @Author yajuxi
     * @Description 根据id查找ckecklist
     * @Param [cid]
     * @return com.wallace.utils.Result
     **/
    @Override
    public Result findByCid(Integer tid,Integer cid, Integer uid) {
        CkList ck = ckListMapper.selectById(cid);
        // 查找progress
        Progress progress = progressMapper.selectProgress(tid, uid, cid);
        CkListView ckListView = new CkListView(ck, progress.getMark());

        return Result.ok(ckListView);
    }

    /*
     * @Author yajuxi
     * @Description 添加本地的checklist到数据库
     * @Param []
     * @return com.wallace.utils.Result
     **/
    @Override
    public Result insertByInit() {

//        String fileName = "data_set/address-change-checklist.json";
//        JSONObject json = JsonTypeHandler.fileToJson(fileName);
//        String header = json.getString("header");
//        CkList ckList = new CkList();
//        ckList.setChecklist(json);
//        ckList.setHeader(header);
//        ckList.setUid(1);
//        int insert = ckListMapper.insert(ckList);
//        if (insert > 0)
//            return Result.ok(null);
//        return Result.build(null, ResultCodeEnum.FAILED);
        List<CkList> ckLists = new ArrayList<>();
        String directoryPath = "data_set";
        try {
            Enumeration<URL> resources = Thread.currentThread().getContextClassLoader().getResources(directoryPath);
            while (resources.hasMoreElements()) {
                URL url = resources.nextElement();
                // 通过判断协议是不是jar文件
                if (url.getProtocol().equals("jar")) {
                    JarURLConnection urlConnection = (JarURLConnection) url.openConnection();
                    JarFile jarFile = urlConnection.getJarFile();
                    Enumeration<JarEntry> entries = jarFile.entries(); // 返回jar中所有的文件目录
                    while (entries.hasMoreElements()) {
                        JarEntry jarEntry = entries.nextElement();
                        if (!jarEntry.isDirectory() && jarEntry.getName().startsWith(directoryPath)) {  // 是我们需要的文件类型
                            String name = jarEntry.getName();
                            JSONObject json = JsonTypeHandler.fileToJson(name);
                            String header = json.getString("header");

                            CkList ckList = new CkList();
                            ckList.setChecklist(json);
                            ckList.setHeader(header);
                            ckList.setUid(1);
                            ckList.setVersion(1);
                            ckList.setIsDeleted(0);
                            ckLists.add(ckList);
                        }
                    }
                } else if (url.getProtocol().equals("file")) {
                    // 获取class 根目录
                    URL resource = Thread.currentThread().getContextClassLoader().getResource(directoryPath);
                    File[] files = new File(resource.getPath()).listFiles();
                    if (files != null) {
                        for (File file : files) {
                            // 遍历data_set中的所有文件
                            JSONObject json = JsonTypeHandler.fileToJson(directoryPath + '/' + file.getName());
                            String header = json.getString("header");
                            CkList ckList = new CkList();
                            ckList.setChecklist(json);
                            ckList.setHeader(header);
                            ckList.setUid(1);
                            ckList.setVersion(1);
                            ckList.setIsDeleted(0);
                            ckLists.add(ckList);
                        }
                    }
                }
                int i = ckListMapper.insertBatchSomeColumn(ckLists);
                if (i < 1)
                    return Result.build(returnEmpty, 404,null);
            }
        } catch (IOException e) {
            System.out.println(directoryPath + "文件读取异常" + e);
            return Result.build(returnEmpty, ResultCodeEnum.FAILED);
        }
        return Result.ok(returnEmpty);
    }

    @Override
    public Result searchByHeader(String header) {
        List<CkList> ckLists = ckListMapper.selectByHeader(header);
        List<Map<Integer, String>> result = new ArrayList<>();
        for (CkList ckList : ckLists) {
            Map<Integer, String> hashMap = new HashMap<>();
            hashMap.put(ckList.getCid(), ckList.getHeader());
            result.add(hashMap);
        }
        if (!result.isEmpty()) {
            return Result.ok(result);
        }
        return Result.build(returnEmpty, 200, "搜索结果为空");
    }

    @Override
    public boolean CidExisted(Integer cid) {
        CkList ckList = ckListMapper.selectById(cid);
        return ckList != null;
    }
}




