package com.joao.model.DTO;

import com.joao.model.enumerators.UserRoleEnum;

public record RegisterDTO(String login, String password, UserRoleEnum role) {

}
