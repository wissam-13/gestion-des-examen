<!DOCTYPE html>
<html>
<head>
    <title style="text-transform: capitalize">Verifiee votre email</title>
</head>
    <style>
        .btn:hover{
            color:white;
            background-color: #7241F3;
        }
    </style>
<body>

    <h1 class="title" style="text-align:center;font-size:2rem;margin-bottom:2rem;color:#7241F3">Gestion des examens</h1>
    <p class="text" style="text-align: center;font-size:1.2rem;font-weight:500;color:#777">Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe</p>
    <div class="btn-content" style=" text-align: center;margin:2rem;">
        <a href="{{route('admin.password.reset',['email' => $admin->email, 'token' => $admin->token])}}" class="btn" style="text-align: center;margin:2rem auto;text-decoration:none;color:#7241F3;font-weight:600;border:1px solid #7241F3;padding:.5rem 1rem;border-radius:2rem;transition:.3s;text-transform:capitalize" onmouseover="this.style.backgroundColor='#619d09';this.style.color='white'" onmouseout="this.style.backgroundColor='#white';this.style.color='#619d09'">
           Réinitialiser le mot de passe
        </a>
    </div>
    <p class="text" style="text-align: center;font-size:1.2rem;font-weight:500;color:#777">Si vous ne vous êtes pas inscrit, veuillez ignorer ce courriel.</p>
</body>
</html>
