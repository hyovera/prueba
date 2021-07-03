<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class car extends Model
{
    //

    protected $table = 'cars';

    public function user()
    {
        return $this->belongsTo('App\user', 'user_id');
    }
}
