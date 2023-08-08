package com.ground.sswm.auth.jwt.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil { //TODO:JWTUtil

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String subject, Map<String, Object> claims, long expiration) {
        return createToken(claims, subject, expiration);
    }

    private String createToken(Map<String, Object> claims, String subject, long expiration) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)// access-token , refresh-token
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(key) // secret key를 이용한 암호화
            .compact(); //직렬화 처리
    }

    // {userId : }
    public Map<String, Object> getClaims(String token) {
        Jws<Claims> claims = extractAllClaims(token);
        return claims.getBody();
    }

    private Jws<Claims> extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Jws<Claims> claims = extractAllClaims(token);
        return claimsResolver.apply(claims.getBody());
    }

    public String extractSubject(String token) { // access-token , refresh-token
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean validateToken(String jwt) throws JwtException { // JWT 유효성 검사
        Jws<Claims> claims = extractAllClaims(jwt);
        log.debug("claims: {}", claims);
        return !isTokenExpired(jwt);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}