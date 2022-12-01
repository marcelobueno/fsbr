<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    use HasFactory;

    protected $connection = 'fsbr';
    public $timestamps = false;
    protected $table = 'estados';
    protected $fillable = ['id', 'estado'];
}
