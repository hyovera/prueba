<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use App\user;
class UserController extends Controller
{
    //
    public function registre(Request $request)
    {
        // reger  post

        //  print_r($request);
        //  die();

        /*
        DB::insert('INSERT INTO users (name, email, password, phone, profession_id)
VALUES (:name, :email, :password, :phone, :profession_id)',[
'name' => 'Ada Lovelace',
'email' => 'alove@gmail.com',
'password' => bcrypt('laragon'),
'phone' => '6622134589',
'profession_id' => $professionID
]);
        
        */

        $json = $request->input('json', null);

        $params = json_decode($json);

        print_r($params);
        die();

        $email =
            !is_null($json) && isset($params->email) ? $params->email : null;
        $name = !is_null($json) && isset($params->name) ? $params->name : null;
        $username =
            !is_null($json) && isset($params->username)
                ? $params->username
                : null;
        $role = 'ROLE_USER';
        $password =
            !is_null($json) && isset($params->password)
                ? $params->password
                : null;
        if (
            !is_null($email) &&
            !is_null($name) &&
            !is_null($username) &&
            !is_null($password)
        ) {
            $user = new User();

            $user->email = $email;
            $user->password = $password;
            $user->name = $name;
            $user->username = $username;
            $user->role = $role;

            $pwd = hash('sha256', $password);
            $user->password = $pwd;
            $user->save();
            $isset_user = User::where('email', '=', $email)->first();

            if (count($isset_user) == 0) {
                $user->save();

                $data = [
                    'status' => 'succes',
                    'code' => 200,
                    'message' => 'usuario registrado',
                ];
            } else {
                $data = [
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'ya exite',
                ];
            }
        } else {
            $data = [
                'status' => 'error',
                'code' => 400,
                'message' => 'usuario  no creado',
            ];
        }

        return $data;
    }

    public function login(Request $request)
    {
        echo 'login ';
        die();
    }
}
