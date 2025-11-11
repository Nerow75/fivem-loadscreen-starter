-- client.lua
local loadingActive = true

CreateThread(function()
    while loadingActive do
        -- Vérifie que le loadscreen est toujours actif avant d’envoyer des données
        if GetIsLoadingScreenActive() then
            local players = GetActivePlayers()
            local playerCount = #players

            -- Envoi du nombre de joueurs à l'UI
            SendLoadingScreenMessage(json.encode({
                playerCount = playerCount
            }))
        else
            -- Si l'écran est fermé, on sort proprement
            loadingActive = false
            break
        end
        Wait(2000) -- évite le spam (2s)
    end
end)

-- Fermeture du loadscreen dès l’arrivée du joueur
AddEventHandler('playerSpawned', function()
    if GetIsLoadingScreenActive() then
        ShutdownLoadingScreen()
    end
    loadingActive = false
end)

-- Nettoyage à l’arrêt de la ressource
AddEventHandler('onClientResourceStop', function(resource)
    if resource == GetCurrentResourceName() then
        loadingActive = false
    end
end)
