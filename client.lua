-- client.lua
local loadingActive = true

CreateThread(function()
    while loadingActive do
        -- Ne spam pas si le loadscreen est déjà fermé
        if GetIsLoadingScreenActive() then
            local playerCount = #GetActivePlayers()
            SendLoadingScreenMessage(json.encode({ playerCount = playerCount }))
        else
            -- Dès que c'est fermé, on stoppe la boucle
            loadingActive = false
            break
        end
        Wait(2000)
    end
end)

-- À l’arrivée en jeu, ferme le loadscreen et arrête le loop
AddEventHandler('playerSpawned', function()
    if GetIsLoadingScreenActive() then
        ShutdownLoadingScreen()
    end
    loadingActive = false
end)

-- Si la ressource s’arrête, on coupe aussi la boucle
AddEventHandler('onClientResourceStop', function(resName)
    if resName == GetCurrentResourceName() then
        loadingActive = false
    end
end)
