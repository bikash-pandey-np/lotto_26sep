<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\State;
use App\Models\District;
use App\Models\LocalBody;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            'Province 1' => [
                'Dhankuta' => [],
                'Bhojpur' => [],
                'Taplejung' => [],
                'Panchthar' => [],
                'Elam' => [],
                'Sankhuvasabha' => [],
                'Thirteenth' => [],
                'Khotang' => [],
                'Solukhumbu' => [],
                'Okhaldhunga' => [],
                'Udaipur' => [],
                'Jhapa' => [],
                'Morang' => [
                    "Biratnagar Metropolitan City",
                    "Sundar Haraicha Municipality",
                    "Belbari Municipality",
                    "Pathari-Sanischare Municipality",
                    "Urlabari Municipality",
                    "Rangeli Municipality",
                    "Letang Bhogateni Municipality",
                    "Ratuwamai Municipality",
                    "Sunawarshi Municipality",
                    "Kerabari Rural Municipality",
                    "Miklajung Rural Municipality",
                    "Kanepokhari Rural Municipality",
                    "Budhiganga Rural Municipality",
                    "Gramthan Rural Municipality",
                    "Katahari Rural Municipality",
                    "Dhanpalthan Rural Municipality",
                    "Jahada Rural Municipality",
                ],
                'Sunsari' => [],
            ],
            'Madhesh Pradesh' => [
                'Dhunasha' => [],
                'Sarlahi' => [],
                'Bara' => [],
                'Saptari' => [],
                'Rautahat' => [],
                'Siraha' => [],
                'Mohattari' => [],
                'Parsa' => []
            ],
            'Bagmati Province' => [
                'Kathmandu' => [],
                'Bhaktapur' => [], 
                'Lalitpur' => [],
                'Sindhuli' => []
            ],
            'Gandaki' => [],
            'Lumbini' => [],
            'Karnali' => [],
            'Sudurpaschim' => [],
        ];

        foreach ($datas as $key => $data) {
            $state = State::create(['name' => $key]);

            foreach ($data as $districtKey => $value) {
                $district = District::create([
                    'name' => $districtKey,
                    'state_id' => $state->id
                ]);

                foreach ($value as $localBodyValue) {
                    LocalBody::create([
                        'name' => $localBodyValue,
                        'ward_count' => 12,
                        'district_id' => $district->id,
                        'state_id' => $state->id,
                    ]);
                }
            }
        }
    }
}