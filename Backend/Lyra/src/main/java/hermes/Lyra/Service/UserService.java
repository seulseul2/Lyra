package hermes.Lyra.Service;

import hermes.Lyra.config.JwtTokenProvider;
import hermes.Lyra.domain.Repository.UserRepository;
import hermes.Lyra.domain.Repository.UserRepository2;
import hermes.Lyra.domain.User;
import hermes.Lyra.dto.UserDto;
import hermes.Lyra.dto.UserLoginRequestDto;
import hermes.Lyra.dto.UserLoginResponseDto;
import hermes.Lyra.error.Exception.custom.SomethingNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserRepository2 userRepository2;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public UserDto searchUser(Long userId) {
        return userRepository.searchUser(userId);
    }
    @Transactional
    public int deleteUser(Long userId) {
        return userRepository.deleteById(userId);
    }
    @Transactional
    public int updateUserNick(Long userId, String nickname){
        return userRepository.updateUserNickname(userId, nickname);
    }

    @Transactional
    public User checkEmail(String email) {
        boolean userEmailDuplicate = userRepository.existsByEmail(email);
        if(!userEmailDuplicate) throw new IllegalStateException("해당 이메일에 존재하는 회원이 없습니다.");

        User user = userRepository.findByEmail(email);
        return user;
    }

    @Transactional
    public User join(UserLoginRequestDto userLoginRequestDto){
        User user = userRepository2.findByEmail(userLoginRequestDto.getEmail()).orElseGet(null);
        if(user == null) {
            User newUser = new User();
            System.out.println("input db");
            newUser.setEmail(userLoginRequestDto.getEmail());
            newUser.setName(userLoginRequestDto.getName());
            newUser.setImage_url(userLoginRequestDto.getImage_url());
            List<String> roles = new ArrayList<>();
            roles.add("ROLE_USER");
            newUser.setRoles(roles);
            return newUser;
        } else {
            return user;
        }
    }

    @Transactional
    public UserLoginResponseDto refreshToken(String token, String refreshToken) throws Exception {

        //if(memberRepository.isLogout(jwtTokenProvider.getUserPk(token))) throw new AccessDeniedException("");
        // 아직 만료되지 않은 토큰으로는 refresh 할 수 없음
        if(jwtTokenProvider.validateToken(token)) throw new AccessDeniedException("token이 만료되지 않음");

        User user = userRepository.findByEmail(jwtTokenProvider.getUserPk(refreshToken));
        System.out.println(user.getRefreshToken());
        if(!refreshToken.equals(user.getRefreshToken())) throw new AccessDeniedException("해당 유저가 존재하지 않습니다.");

        if(!jwtTokenProvider.validateToken(user.getRefreshToken()))
            throw new IllegalStateException("다시 로그인 해주세요.");

        user.changeRefreshToken(jwtTokenProvider.createRefreshToken(user.getEmail(), user.getRoles()));

        UserLoginResponseDto userLoginResponseDto = UserLoginResponseDto.builder()
                .email(user.getEmail())
                .accessToken(jwtTokenProvider.createToken(user.getEmail(), user.getRoles()))
                .refreshToken(user.getRefreshToken())
                .id(user.getId()).nickname(user.getNickname())
                .build();

        return userLoginResponseDto;
    }

    @Transactional
    public void logout(String token) throws IllegalStateException {
        boolean result = jwtTokenProvider.validateToken(token);
        if(!result) throw new IllegalStateException("토큰 만료 되었습니다.");
        User user = userRepository.findByEmail(jwtTokenProvider.getUserPk(token));
        user.changeRefreshToken("invalidate");
    }

    @Transactional
    public void joinSocial(UserDto userDto){
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        userRepository.save(user);
    }

    @Transactional
    public void socialLogin(String email, String refreshToken){
        userRepository.socialLogin(email, refreshToken);
    }

    @Transactional
    public UserLoginResponseDto getUser(String accessToken) throws Exception {
        String email = jwtTokenProvider.getUserPk(accessToken);
        User user = userRepository.findByEmail(email);
        if(user == null) throw new SomethingNotFoundException("user(email:"+email+")");
        // 리프레쉬 토큰 발급
        UserLoginResponseDto userDto = UserLoginResponseDto.builder()
                .email(email)
                .accessToken(accessToken)
                .refreshToken(user.getRefreshToken())
                .id(user.getId()).nickname(user.getNickname())
                .build();

        return userDto;
    }

    public UserLoginResponseDto userGet(Long userId) throws Exception {
        User user = userRepository.findOne(userId);

        UserLoginResponseDto userLoginResponseDto = UserLoginResponseDto.builder()
                .email(user.getEmail())
                .id(user.getId()).nickname(user.getNickname())
                .build();

        return userLoginResponseDto;
    }

    @Transactional
    public void checkEmailDuplicate(String email) {
        boolean userEmailDuplicate = userRepository.existsByEmail(email);
        if(userEmailDuplicate) throw new IllegalStateException("이미 존재하는 회원입니다.");
    }
}
