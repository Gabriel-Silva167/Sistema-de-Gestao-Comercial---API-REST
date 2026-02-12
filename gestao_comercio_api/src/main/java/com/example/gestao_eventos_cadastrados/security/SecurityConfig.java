package com.example.gestao_eventos_cadastrados.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.security.interfaces.RSAPrivateKey;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.private.key}")
    private RSAPrivateKey privateKey;

    @Autowired
    SecurityFilter securityFilter;

    //Customiza as configurações de segurança
    @Bean
    private SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        //configuração de autorização
        http.authorizeHttpRequests(authorize -> authorize
                //permite apenas que o login faça uma requisição sem enviar um token, o resto é obrigatório
                        .requestMatchers(HttpMethod.POST,"/users/login").permitAll()
                        .anyRequest().authenticated())
                .csrf(csrf -> csrf.disable())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
