<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstname')->after('name');
            $table->string('lastname')->after('firstname');
            $table->string('departement')->after('password');
            $table->string('speciality')->after('departement');
            $table->string('phone')->after('email');
            $table->integer('max_supervisions')->after('phone');
            $table->boolean('is_active')->default(false)->after('speciality');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['firstname', 'lastname', 'is_active','departement','speciality','phone','max_supervisions']);
        });
    }
};
