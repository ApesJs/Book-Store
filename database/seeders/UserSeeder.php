<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            [
                'name' => 'Asep Jaenudin Sutarji',
                'email' => 'asepjaenudinsutarji@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'N Hani Nurhalisah',
                'email' => 'nhaninurhalisah@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
            ],
        ])->each(fn ($q) => User::create($q));
    }
}
