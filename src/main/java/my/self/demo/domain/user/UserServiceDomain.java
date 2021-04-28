package my.self.demo.domain.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import my.self.demo.data.user.UserRepository;
import my.self.demo.domain.model.Role;
import my.self.demo.domain.model.User;
import my.self.demo.web.form.UserRegistrationForm;

@Service
public class UserServiceDomain implements UserService {

    @Autowired
    UserRepository userService;

    @Autowired
    private BCryptPasswordEncoder bCrypt;

    @Override
    public List<User> getList() {
        List<User> users = new ArrayList<>();
        userService.findAll().forEach(users::add);

        return users;
    }

    @Override
    public boolean isUserWithEmailExist(String email) {
        return userService.countByEmail(email) != 0 ? true : false;
    }

    @Override
    public void createUserFromRegistrationForm(UserRegistrationForm userForm) {
        User u = new User();

        BeanUtils.copyProperties(userForm, u);
        u.setPassword(bCrypt.encode(userForm.getPassword()));
        u.setEnabled(true);
        u.addRole(Role.USER);

        userService.save(u);

    }
}