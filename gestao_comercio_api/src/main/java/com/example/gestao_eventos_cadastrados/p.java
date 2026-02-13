package com.example.gestao_eventos_cadastrados;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class p {
    public static void main (String [] args){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String senha = bCryptPasswordEncoder.encode("admin");
        System.out.println(senha);
    }
}
