package my.self.demo.domain.user;


import java.util.List;

import my.self.demo.domain.model.User;
import my.self.demo.web.form.UserRegistrationForm;

public interface UserService {

    List<User> getList();

    boolean isUserWithEmailExist(String email);
    void createUserFromRegistrationForm(UserRegistrationForm form);
}
