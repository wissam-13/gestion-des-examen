<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('entity');
            $table->integer('entity_id');
            $table->string('action');
            $table->unsignedBigInteger('Performed_by_admin')->nullable();
            $table->unsignedBigInteger('Performed_by_planer')->nullable();
            $table->timestamp('performed_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->jsonb('details');
            $table->foreign('Performed_by_admin')->references('id')->on('admins')->onDelete('cascade');
            $table->foreign('Performed_by_planer')->references('id')->on('planers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
