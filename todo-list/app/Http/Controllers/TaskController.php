<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function getTask() {
        return response()->json(Task::all(), 200);
    }
}
