package com.spriing.parmesanar.service;

import com.spriing.parmesanar.pojo.AuthenticateRequest;
import com.spriing.parmesanar.pojo.AuthenticateResponse;

public interface AuthenticateService {

    AuthenticateResponse authenticate(AuthenticateRequest authenticateRequest);
}
