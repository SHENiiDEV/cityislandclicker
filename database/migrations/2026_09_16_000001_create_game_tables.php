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
            $table->double('coins')->default(0)->after('password');
            $table->unsignedInteger('gems')->default(25)->after('coins'); // Give 25 gems starter bonus
            $table->timestamp('last_sync_at')->nullable()->after('gems');
            $table->string('session_secret', 64)->nullable()->after('last_sync_at');
            $table->unsignedInteger('cheat_flags')->default(0)->after('session_secret');
            $table->unsignedBigInteger('total_clicks')->default(0)->after('cheat_flags');
        });

        Schema::create('upgrades', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category')->default('passive'); // 'click' or 'passive'
            $table->double('base_cost');
            $table->double('cost_multiplier')->default(1.15);
            $table->double('base_power');
            $table->string('icon')->default('hammer');
            $table->unsignedInteger('tier')->default(1);
            $table->unsignedInteger('order')->default(1);
            $table->timestamps();
        });

        Schema::create('user_upgrades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('upgrade_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('level')->default(0);
            $table->timestamps();

            $table->unique(['user_id', 'upgrade_id']);
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('order_id')->unique();
            $table->string('package_key');
            $table->decimal('amount_fiat', 8, 2);
            $table->string('currency', 3)->default('USD');
            $table->unsignedInteger('gems_reward');
            $table->string('status')->default('pending'); // pending, success, failed
            $table->string('payment_gateway')->default('gateway_seamless');
            $table->json('payload')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });

        Schema::create('sync_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->double('cps')->default(0);
            $table->double('earned_clicks')->default(0);
            $table->double('earned_passive')->default(0);
            $table->boolean('is_flagged')->default(false);
            $table->string('flag_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sync_logs');
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('user_upgrades');
        Schema::dropIfExists('upgrades');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'coins',
                'gems',
                'last_sync_at',
                'session_secret',
                'cheat_flags',
                'total_clicks',
            ]);
        });
    }
};
