package com.wallace.utils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * ClassName: StringToArray
 * Package: com.wallace.utils
 * Description:
 *
 * @Author yajuxi
 */

public class StringToArray {

    // 将布尔列表转换为字符串
    public static String booleanListToString(List<Boolean> booleanList) {
        return booleanList.stream()
                .map(Object::toString)
                .collect(Collectors.joining(",", "[", "]"));
    }

    // 将字符串转换为布尔列表
    public static List<Boolean> stringToBooleanList(String booleanListString) {
        List<Boolean> emptyBooleanList = Collections.emptyList();
        if (Objects.equals(booleanListString, "[]") || booleanListString == null) {
            return emptyBooleanList;
        }
        // 去除字符串中的方括号并按逗号分割
        String[] booleanStrings = booleanListString.substring(1, booleanListString.length() - 1).split(",");

        // 将字符串数组中的元素转换为布尔值并存入布尔列表
        return Arrays.stream(booleanStrings)
                .map(String::trim)
                .map(Boolean::parseBoolean)
                .collect(Collectors.toList());
    }
}
