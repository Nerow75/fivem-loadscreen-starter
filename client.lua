-- client.lua

-- Liste des types météo possibles dans GTA V
local WEATHER_NAMES = {
  "EXTRASUNNY", "CLEAR", "NEUTRAL", "SMOG", "FOGGY",
  "OVERCAST", "CLOUDS", "CLEARING", "RAIN", "THUNDER",
  "SNOW", "BLIZZARD", "SNOWLIGHT", "XMAS", "HALLOWEEN"
}

local function hashToWeatherName(hash)
  for _, name in ipairs(WEATHER_NAMES) do
    if GetHashKey(name) == hash then
      return name
    end
  end
  return "UNKNOWN"
end

-- Boucle qui push l'heure et la météo vers la NUI du loading screen
CreateThread(function()
  while true do
    -- Heure In-Game
    local hh = GetClockHours()
    local mm = GetClockMinutes()
    local timeStr = string.format("%02d:%02d", hh, mm)

    -- Météo dominante (selon la transition en cours)
    local prevW, nextW, percent = GetWeatherTypeTransition()
    local dominant = percent and nextW and prevW and (percent > 0.5 and nextW or prevW) or prevW or nextW
    local weatherName = dominant and hashToWeatherName(dominant) or "UNKNOWN"

    -- Envoi à la NUI (ton App.jsx écoute igTime / igWeather)
    SendNUIMessage({
      igTime = timeStr,
      igWeather = weatherName
    })

    Wait(2000) -- rafraîchit toutes les 2s
  end
end)

-- (Optionnel) si ton serveur a un event météo custom, branche-le ici :
-- RegisterNetEvent('weatherSync:updateWeather', function(newWeather)
--   SendNUIMessage({ igWeather = tostring(newWeather) })
-- end)
